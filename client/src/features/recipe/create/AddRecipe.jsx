import React, { useState } from "react";
import { checkSVG } from "../../../styles/svgs";
import { queryClient } from "../../services/react-query-client";
import {
  useCreateIngredients,
  useCreateInstructions,
  useCreateRecipe
} from "../../services/recipeService";
import { parseIngredients, parseInstructions } from "./addRecipe";

const initialRecipeToAddState = {
  name: "",
  description: "",
  ingredients: "",
  instructions: "",
  imageUrl: ""
};
const initialAddButtonState = { class: "add-btn-svg--hidden", isAdded: false };

export const AddRecipe = ({ recipes, formStateClass }) => {
  const recipe = useCreateRecipe(recipes);
  const instructions = useCreateInstructions();
  const ingredients = useCreateIngredients();

  const [recipeToAdd, setRecipetToAdd] = useState(initialRecipeToAddState);
  const [addButton, setAddButton] = useState(initialAddButtonState);

  const handleChange = (event) => {
    if (addButton.isAdded) setAddButton(initialAddButtonState);
    const { name } = event.target;
    setRecipetToAdd({ ...recipeToAdd, [name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const recipeBody = {
      "recipe-name": recipeToAdd.name,
      description: recipeToAdd.description,
      "user-id": recipes[0]["user-id"],
      "img-url": recipeToAdd.imageUrl
    };
    const parsedIngredients = parseIngredients(recipeToAdd.ingredients);
    const parsedInstructions = parseInstructions(recipeToAdd.instructions);

    await recipe.mutateAsync(recipeBody);

    const newRecipeId = queryClient.getQueryData(["recipe", { "user-id": recipes[0]["user-id"] }])
      .data.recipe[0];
    console.log({ newRecipeId });

    const ingredientsBody = parsedIngredients.map((ingredientToAdd) => ({
      "recipe-id": newRecipeId,
      name: ingredientToAdd
    }));

    const instructionsBody = parsedInstructions.map((instruction, index) => ({
      "recipe-id": newRecipeId,
      description: instruction,
      step: index + 1
    }));

    ingredients.mutate(ingredientsBody);
    instructions.mutate(instructionsBody);

    setRecipetToAdd(initialRecipeToAddState);
    setAddButton((state) => ({ ...state, isAdded: true, class: "add-btn-svg" }));
  };
  return (
    <form className={formStateClass} onSubmit={handleSubmit}>
      <div className="add-form__container add-form__container--top">
        <label className="add-form__label add-form__label--name">
          Recipe Name
          <input
            required
            type="text"
            placeholder="Creamy Mushroom Toast With Soft Egg & Gruyère"
            name="name"
            value={recipeToAdd.name}
            onChange={handleChange}
            className="add-form__input"
          />
        </label>
        <label className="add-form__label">
          Recipe Description
          <input
            required
            type="text"
            placeholder="A twist on the beloved British favorite, delightfully simple and absolutely delicious for breakfast, brunch, lunch, or even dinner."
            name="description"
            value={recipeToAdd.description}
            onChange={handleChange}
            className="add-form__input"
          />
        </label>
        <label className="add-form__label">
          Image Address
          <input
            required
            type="text"
            placeholder="https://www.gordonramsay.com/assets/Uploads/_resampled/CroppedFocusedImage108081050-50-Mushroomtoast.jpg"
            name="imageUrl"
            value={recipeToAdd.imageUrl}
            onChange={handleChange}
            className="add-form__input"
          />
        </label>
      </div>

      <div className="add-form__container add-form__container--bottom">
        <label className="add-form__label add-form__label-textarea">
          Ingredients
          <textarea
            required
            className="add-form__textarea"
            name="ingredients"
            cols="30"
            rows="10"
            placeholder="2 tablespoons unsalted butter
              8 ounces mushrooms
              3 cloves garlic, smashed
              3 large sprigs of thyme
              ½ shallot..."
            value={recipeToAdd.ingredients}
            onChange={handleChange}
          />
        </label>
        <label className="add-form__label add-form__label-textarea">
          Instructions
          <textarea
            required
            className="add-form__textarea"
            name="instructions"
            cols="30"
            rows="10"
            placeholder="Make the Mushrooms: Heat a large skillet over medium-high heat and melt butter. Once melted, add mushrooms (working in batches if needed to not..."
            value={recipeToAdd.instructions}
            onChange={handleChange}
          />
        </label>
      </div>
      <button className="add-btn-submit" type="submit">
        {addButton.isAdded ? "Recipe Added" : "Add Recipe"}
        <span className={addButton.class}>{checkSVG}</span>
      </button>
    </form>
  );
};