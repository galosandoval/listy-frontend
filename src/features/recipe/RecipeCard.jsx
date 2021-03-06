import React, { lazy, Suspense, useState } from "react";
import { CardMenu } from "./CardMenu";
import { EditRecipe } from "./edit/EditRecipe";
import { EditInstructions } from "./edit/EditInstructions";
import { EditIngredients } from "./edit/EditIngredients";
import { useHistory } from "react-router-dom";
import { downArrowSVG } from "../../styles/svgs";
import { Loading } from "../status/Loading";

// import { Accordian } from "./Accordian";
const Accordian = lazy(() => import("./Accordian"));

const initialAccordianState = {
  ingredientsClass: "accordian accordian--hidden",
  carrotClass: "recipe-card__carrot-button",
  isOpen: false,
  style: { maxHeight: 0 }
};
const initialDescriptionState = (recipe) => {
  return {
    description:
      recipe.description.length > 65 ? recipe.description.slice(0, 60) + "..." : recipe.description,
    isOpen: false,
    buttonText: "Read more",
    showButton: recipe.description.length > 65
  };
};
const initialDropdownState = {
  class: "card-menu__content",
  open: false
};
const initialEditCardState = {
  class: "edit-card",
  open: false
};
const initialEditInstructionsState = {
  class: "edit-card",
  open: false
};
const initialEditIngredientsState = {
  class: "edit-card",
  open: false
};

export const RecipeCard = ({ recipe, index, closeOpenCarrots }) => {
  const [recipeDescription, setRecipeDescription] = useState(initialDescriptionState(recipe));
  const [accordian, setAccordian] = useState(initialAccordianState);
  const [dropdown, setDropdown] = useState(initialDropdownState);
  const [editRecipe, setEditRecipe] = useState(initialEditCardState);
  const [editInstructions, setEditInstructions] = useState(initialEditInstructionsState);
  const [editIngredients, setEditIngredients] = useState(initialEditIngredientsState);

  const history = useHistory();

  const handleClick = (event) => {
    const { name } = event.currentTarget;
    // Edit Menu Click
    if (name === "dropbtn" && !editRecipe.open && !editInstructions.open && !editIngredients.open) {
      closeOpenCarrots();
      !dropdown.open
        ? setDropdown({
            class: "card-menu__content card-menu__content--show",
            open: true
          })
        : setDropdown(initialDropdownState);
    } else if (name === "closedrop") {
      setEditRecipe(initialEditCardState);
      setEditInstructions(initialEditCardState);
      setEditIngredients(initialEditIngredientsState);
    } else if (name === "desc-btn") {
      setDropdown(initialDropdownState);
      setEditRecipe({ class: "edit-card edit-card--show", open: true });
    } else if (name === "instructions-btn") {
      setDropdown(initialDropdownState);
      setEditInstructions({ class: "edit-card edit-card--show", open: true });
    } else if (name === "ingredients-btn") {
      setDropdown(initialDropdownState);
      setEditIngredients({ class: "edit-card edit-card--show", open: true });
    } else if (name === "delete-recipe") {
    }
    // Carrot Click
    else if (name === "carrot-btn") {
      closeOpenCarrots();
      history.push("/recipes/ingredients");

      if (accordian.isOpen) {
        setAccordian(initialAccordianState);
      } else if (!accordian.isOpen) {
        setAccordian({
          ingredientsClass: "accordian",
          carrotClass: "recipe-card__carrot-button recipe-card__carrot-button--rotate",
          isOpen: true
        });
      }
    } else if (name === "learn-btn") {
      if (recipeDescription.isOpen) {
        setRecipeDescription(initialDescriptionState(recipe));
      } else {
        setRecipeDescription({
          ...recipeDescription,
          description: recipe.description,
          isOpen: true,
          buttonText: "Say less"
        });
      }
    }
  };

  return (
    <div id={recipe["recipe-name"]} className="card recipe-card">
      <EditRecipe
        setEditRecipe={setEditRecipe}
        initialEditCardState={initialEditCardState}
        recipe={recipe}
        editRecipe={editRecipe}
        handleClick={handleClick}
      />

      <EditInstructions
        editInstructions={editInstructions}
        recipe={recipe}
        setEditInstructions={setEditInstructions}
        initialEditInstructionsState={initialEditInstructionsState}
        handleClick={handleClick}
      />

      <EditIngredients
        recipe={recipe}
        editIngredients={editIngredients}
        setEditIngredients={setEditIngredients}
        initialEditIngredientsState={initialEditIngredientsState}
        handleClick={handleClick}
      />
      <div className="card-header recipe-card__header">
        <h2 className="recipe-name recipe-card__name u-card-heading">{recipe["recipe-name"]}</h2>
        <CardMenu
          editRecipe={editRecipe}
          editInstructions={editInstructions}
          editIngredients={editIngredients}
          handleClick={handleClick}
          dropdown={dropdown}
          setDropdown={setDropdown}
          initialDropdownState={initialDropdownState}
          recipe={recipe}
        />
        <p className="recipe-card__author">
          <span className="recipe-card__author-span">by </span>
          <a
            href={recipe.address}
            target="_blank"
            rel="noreferrer"
            className="recipe-card__author-link"
          >
            {recipe.author}
          </a>
        </p>
      </div>

      <div className="recipe-card__img-container">
        <img className="recipe-card__img" src={recipe["img-url"]} alt={recipe["recipe-name"]} />
      </div>

      <div className="recipe-card__description">
        <p>{recipeDescription.description}</p>
        <button
          className={
            recipeDescription.showButton
              ? "recipe-card__learn-button"
              : "recipe-card__learn-button recipe-card__learn-button--hidden"
          }
          name="learn-btn"
          onClick={handleClick}
        >
          {recipeDescription.buttonText}
        </button>
      </div>
      <button
        className={`btn-round ${accordian.carrotClass}`}
        name="carrot-btn"
        onClick={handleClick}
      >
        {downArrowSVG}
      </button>
      <Suspense fallback={<Loading />}>
        <Accordian accordian={accordian} id={recipe.id} index={index} />
      </Suspense>
    </div>
  );
};
