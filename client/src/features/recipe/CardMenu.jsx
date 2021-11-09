import React from "react";
import OutsideClickHandler from "react-outside-click-handler";

export const CardMenu = ({
  dropdown,
  handleClick,
  editRecipe,
  editInstructions,
  editIngredients,
  setDropdown,
  initialDropdownState
}) => {
  const svg = (
    <svg
      className="card-menu__dropdown-btn--svg"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path d="M23.954 21.03l-9.184-9.095 9.092-9.174-2.832-2.807-9.09 9.179-9.176-9.088-2.81 2.81 9.186 9.105-9.095 9.184 2.81 2.81 9.112-9.192 9.18 9.1z" />
    </svg>
  );

  const handleOutsideClick = () => {
    setDropdown(initialDropdownState);
  };

  const handleCloseMenu = () => {
    setDropdown(initialDropdownState);
  };

  return (
    <div className="card-menu">
      <OutsideClickHandler onOutsideClick={handleOutsideClick}>
        {editRecipe.open || editInstructions.open || editIngredients.open ? (
          <button className="card-menu__closedrop-btn" onClick={handleClick}>
            {svg}
          </button>
        ) : dropdown.open ? (
          <button className="card-menu__dropdown-btn" onClick={handleCloseMenu} name="closedrop">
            {svg}
          </button>
        ) : (
          <button className="card-menu__dropdown-btn" name="dropbtn" onClick={handleClick}>
            <svg
              className="card-menu__dropdown-btn--svg"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M6 12c0 1.657-1.343 3-3 3s-3-1.343-3-3 1.343-3 3-3 3 1.343 3 3zm9 0c0 1.657-1.343 3-3 3s-3-1.343-3-3 1.343-3 3-3 3 1.343 3 3zm9 0c0 1.657-1.343 3-3 3s-3-1.343-3-3 1.343-3 3-3 3 1.343 3 3z" />
            </svg>
          </button>
        )}
      </OutsideClickHandler>
      <div className={dropdown.class}>
        <button className="card-menu__edit-btn" onClick={handleClick}>
          Edit Description
        </button>
        <button className="card-menu__instructions-btn" onClick={handleClick}>
          Edit Instructions
        </button>
        <button className="card-menu__ingredients-btn" onClick={handleClick}>
          Edit Ingredients
        </button>
      </div>
    </div>
  );
};