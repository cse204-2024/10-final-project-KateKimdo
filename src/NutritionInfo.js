// NutritionInfo.js
import React from "react";

const NutritionInfo = ({ info }) => {
  if (!info) return null;

  return (
    <div>
      <h3>Nutrition Details:</h3>
      {/* Map over the nutrition details */}
      {/* This assumes you have an array of nutrients in the info object */}
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