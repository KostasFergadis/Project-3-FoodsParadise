import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { API_URL } from "../consts-data";
import FoodCard from "../components/FoodCard";

const Explore = () => {
  const [foods, setFoods] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [usersList, setUsersList] = useState([]);
  const loggedIn = Boolean(localStorage.getItem("token"));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${API_URL}/foods`);
        const ranked = [...res.data.data].sort(
          (a, z) => parseInt(z.name) - parseInt(a.name) || 0
        );
        setFoods(ranked);
        const token = localStorage.getItem("token");
        if (token) {
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
          const res1 = await axios.get(`${API_URL}/my-list`);
          setUsersList(res1.data.foods);
        }
      } catch (err) {
        console.log(err);
        setError("We couldn’t load the foods. Please try again in a moment.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const query = searchInput.trim().toLowerCase();
  const matches = useMemo(
    () =>
      query
        ? foods.filter(
            (food) =>
              food.origin.toLowerCase().includes(query) ||
              food.name.toLowerCase().includes(query)
          )
        : [],
    [foods, query]
  );

  return (
    <div className="explore">
      <section className="explore-header">
        <h1 className="explore-title">Welcome to the foods paradise</h1>
        <div className="search-wrap">
          <input
            className="input-search"
            type="search"
            placeholder="Search by country or dish"
            aria-label="Search by country or dish"
            autoComplete="off"
            onChange={(e) => setSearchInput(e.target.value)}
            value={searchInput}
          />
          {query && (
            <ul className="search-results">
              {matches.length === 0 && (
                <li className="no-results">No matches for “{searchInput}”</li>
              )}
              {matches.map((food) => (
                <li key={food._id}>
                  <Link to={`/foods/${food._id}`}>
                    {food.flagUrl && <img src={food.flagUrl} alt="" />}
                    <span>{food.name}</span>
                    <small>{food.origin}</small>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <section className="explore-body">
        <h2 className="bigTitle">Check out the top 10 foods in the world</h2>
        {!loggedIn && (
          <p className="subTitle">
            <Link to="/login">Log in</Link> to add a food with its recipe to
            your own list
          </p>
        )}
        {isLoading && (
          <ul className="food-grid" aria-busy="true">
            {Array.from({ length: 6 }).map((_, i) => (
              <li className="food-tile skeleton" key={i} />
            ))}
          </ul>
        )}
        {error && <p className="error">{error}</p>}
        {!isLoading && !error && (
          <ul className="food-grid">
            {foods.map((element) => (
              <FoodCard
                element={element}
                key={element._id}
                usersList={usersList}
              />
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

export default Explore;
