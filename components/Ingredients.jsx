const Ingredients = ({ ingredients }) => {
  return (
    <ul>
      {ingredients.map((ing, idx) => (
        <li key={idx}>{ing}</li>
      ))}
    </ul>
  );
};

export default Ingredients;
