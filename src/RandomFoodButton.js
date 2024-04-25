import React from 'react';

const RandomFoodButton = ({ fetchRandomFood }) => {
  return (
    <button onClick={fetchRandomFood} className="random-food-button">
      Random Food
    </button>
  );
};

export default RandomFoodButton;
