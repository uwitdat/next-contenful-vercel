import React from 'react';
import Ingredients from './Ingredients';
import Link from 'next/link';
import Image from 'next/image';

const List = ({ list }) => {
  console.log(list);
  return (
    <div>
      {list.map((item) => (
        <div key={item.sys.id}>
          <h1>{item.fields.title}</h1>
          <h4>Cooking time: {item.fields.cookingTime} mins</h4>
          <h2>Ingredients</h2>
          <Image
            src={`https:${item.fields.thumbail.fields.file.url}`}
            height={300}
            width={300}
          />
          <Ingredients ingredients={item.fields.ingredients} />
          <Link href={`/recipe/${item.fields.slug}`}>
            <button>View More</button>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default List;
