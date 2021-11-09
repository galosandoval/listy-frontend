import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Carousel } from "./Carousel";
import { Paper } from "./Paper";

const initialListState = {
  isVisible: false,
  setTop: null
};

export const GrocerylistCard = ({ list }) => {
  const [carousel, setCarousel] = useState(0);
  const [page, setPage] = useState(1);
  const [listState, setListState] = useState(initialListState);

  const card = useRef(null);

  const handleClick = (event) => {
    const { name } = event.currentTarget;
    if (name === "right-button") {
      setCarousel((state) => (state -= 25));
      setPage((state) => (state += 1));
    }
    if (name === "left-button") {
      setCarousel((state) => (state += 25));
      setPage((state) => (state -= 1));
    }
    if (name === "list") {
      listState.isVisible
        ? setListState({ isVisible: false, setTop: card.current.offsetHeight })
        : setListState({ isVisible: true, setTop: 0 });
    }
  };

  useLayoutEffect(() => {
    const circles = document.querySelectorAll(".carousel__svg-circle");
    if (circles[page - 2]) {
      circles[page - 2].classList.remove("carousel__svg-circle--no-opacity");
    } else {
      circles[page].classList.remove("carousel__svg-circle--no-opacity");
    }
    circles[page - 1].classList.add("carousel__svg-circle--no-opacity");
  }, [page]);

  useEffect(() => {
    setListState((state) => ({ ...state, setTop: card.current.offsetHeight }));
  }, []);

  return (
    <div ref={card} className="card grocerylist-card" key={list.id}>
      <h2>{list["grocery-list-name"]}</h2>
      <div className="grocerylist-card__carousel">
        {list["img-url"].length > 1 && (
          <Carousel page={page} handleClick={handleClick} list={list} />
        )}
        <div
          className="grocerylist-card__images"
          style={{ transform: `translateX(${carousel}em)` }}
        >
          {list["img-url"].map((img, index) => (
            <img
              className="grocerylist-card__image"
              src={img}
              alt={list.descriptions}
              key={list.description[index]}
            />
          ))}
        </div>
      </div>
      <div className="grocerylist-card__text">
        <h2>Recipes</h2>
        {list["recipe-name"].map((name, index) => (
          <li key={`${name}-${index}`}>{name}</li>
        ))}
        <button name="list" onClick={handleClick}>
          Ingredients {">"}
        </button>
      </div>
      <Paper
        grocerylistId={list["grocery-list-id"]}
        listState={listState}
        handleClick={handleClick}
      />
    </div>
  );
};