import React from 'react';
import client from '../../contentfulClient';
import Image from 'next/image';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

export async function getStaticPaths() {
  const res = await client.getEntries({
    content_type: 'list',
  });

  const paths = res.items.map((item) => {
    return {
      params: { slug: item.fields.slug },
    };
  });

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const { items } = await client.getEntries({
    content_type: 'list',
    'fields.slug': params.slug,
  });

  if (!items.length) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {
      recipe: items[0],
    },
    revalidate: 100, // min num of seconds before next checks for data updates
  };
}

const Recipe = ({ recipe }) => {
  if (!recipe) return <div>loading...</div>;

  return (
    <div>
      <h1>{recipe.fields.title}</h1>
      <h4>Time to cook: {recipe.fields.cookingTime} mins</h4>
      <p>{recipe.fields.method.content[0].content[0].value}</p>
      <ul>
        {recipe.fields.ingredients.map((ing, idx) => (
          <li key={idx}>{ing}</li>
        ))}
      </ul>
      <Image
        height={400}
        width={400}
        src={`http:${recipe.fields.thumbail.fields.file.url}`}
      />
      <div>{documentToReactComponents(recipe.fields.method)}</div>
    </div>
  );
};

export default Recipe;
