import React from "react";
import { RecipeIngredients } from "./RecipeIngredients";
import { RecipeInstructions } from "./RecipeInstructions";
import { NavLink, Route, useRouteMatch } from "react-router-dom";
import { Loading } from "../status/Loading";
import { useGetIngredients, useGetInstructions } from "../services/recipeService";

const Accordian = ({ accordian, id }) => {
  const { data: ingredients, isLoading: ingredientsIsLoading } = useGetIngredients(id);
  const { data: instructions, isLoading: instructionsIsLoading } = useGetInstructions(id);
  const match = useRouteMatch();


  if (ingredientsIsLoading || instructionsIsLoading) {
    return <Loading />;
  }
  return (
    <div className={accordian.ingredientsClass}>
      <div className="accordian__tabs">
        <NavLink
          className="navbar__link accordian__link"
          activeClassName="navbar__active"
          to={`${match.url}/ingredients`}
        >
          Ingredients
        </NavLink>
        <NavLink
          className="navbar__link accordian__link"
          activeClassName="navbar__active"
          to={`${match.url}/instructions`}
        >
          Instructions
        </NavLink>
      </div>
      <Route path={`${match.url}/ingredients`}>
        <RecipeIngredients ingredients={ingredients} />
      </Route>
      <Route path={`${match.url}/instructions`}>
        <RecipeInstructions instructions={instructions} />
      </Route>
    </div>
  );
};

export default Accordian;
