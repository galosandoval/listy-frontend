import React from "react";

export const RecipeInstructions = ({ instructions }) => {
  return (
    <ol className="instructions">
      {instructions.map((instruction) => (
        <li className="instruction"  key={instruction.id}>{instruction.description}</li>
      ))}
    </ol>
  );
};