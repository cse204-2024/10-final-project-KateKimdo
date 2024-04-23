// NutritionInfo.js
import React from "react";

const NutritionInfo = ({ info, itemName }) => {
  if (!info) return null;

  return (
    <div>
      <h2 className="foodItemName">{itemName}</h2>
      <h3>Nutrition Details:</h3>
      {info.foodNutrients.map((nutrient, index) => (
        <p key={index}>
          <span className="label">{nutrient.nutrientName}</span>
          <span className="value">
            {nutrient.value}
            <em> {nutrient.unitName}</em>
          </span>
        </p>
      ))}
    </div>
  );
};

export default NutritionInfo;
