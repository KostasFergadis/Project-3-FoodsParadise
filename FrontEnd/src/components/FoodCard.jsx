import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../consts-data";

const FoodCard = ({ element, usersList }) => {
  const loggedIn = Boolean(localStorage.getItem("token"));
  const [isInList, setIsInList] = useState(false);

  useEffect(() => {
    setIsInList(usersList.some((food) => food._id === element._id));
  }, [usersList, element]);

  const addToMyList = async () => {
    if (isInList) return;
    try {
      await axios.post(`${API_URL}/my-list/${element._id}`);
      setIsInList(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <li className="food-tile">
      <Link to={`/foods/${element._id}`} className="food-tile-media">
        <img src={element.foodUrl} alt={element.name} loading="lazy" />
      </Link>
      {loggedIn && (
        <button
          type="button"
          className={`list-btn${isInList ? " is-added" : ""}`}
          onClick={addToMyList}
          aria-label={isInList ? "In your list" : `Add ${element.name} to your list`}
          title={isInList ? "In your list" : "Add to my list"}
        >
          {isInList ? (
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M5 12.5l4.5 4.5L19 7.5" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 5v14M5 12h14" />
            </svg>
          )}
        </button>
      )}
      <div className="food-tile-body">
        <h3>
          <Link to={`/foods/${element._id}`}>{element.name}</Link>
        </h3>
        <p className="origin">
          {element.flagUrl && <img src={element.flagUrl} alt="" />}
          <span>{element.origin}</span>
        </p>
      </div>
    </li>
  );
};

export default FoodCard;
