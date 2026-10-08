import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../consts-data";
import Button from "react-bootstrap/Button";

const emptyFood = {
  foodUrl: "",
  flagUrl: "",
  name: "",
  origin: "",
  ingredients: "",
};

const MyList = () => {
  const [error, setError] = useState("");
  const [list, setList] = useState([]);
  const [createFood, setCreateFood] = useState(emptyFood);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = token
      ? `Bearer ${token}`
      : "";
    const fetchData = async () => {
      try {
        const res = await axios.get(`${API_URL}/my-list`);
        setList(res.data.foods);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const flashError = (message) => {
    setError(message);
    setTimeout(() => setError(""), 3000);
  };

  const onChangeHandler = (e) => {
    setCreateFood({ ...createFood, [e.target.name]: e.target.value });
  };

  const submitFoodForm = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/my-list`, createFood);
      setCreateFood(emptyFood);
      const updatedList = await axios.get(`${API_URL}/my-list`);
      setList(updatedList.data.foods);
    } catch (err) {
      flashError(err.response?.data?.message || "Could not add that food");
    }
  };

  const removeFromList = async (foodId) => {
    try {
      await axios.delete(`${API_URL}/my-list/${foodId}`);
      setList(list.filter((item) => item._id !== foodId));
    } catch (err) {
      flashError(err.response?.data?.message || "Could not remove that food");
    }
  };

  return (
    <div className="list-page">
      <div className="list">
        <header className="list-head">
          <h1>My List</h1>
          <p>Foods you saved, plus any you’ve added yourself.</p>
        </header>
        {error && (
          <p className="error" role="alert">
            {error}
          </p>
        )}
        <div className="list-layout">
          <form className="list-form" onSubmit={submitFoodForm}>
            <h2>Add a food</h2>
            <input
              className="review-input"
              type="url"
              placeholder="Food image URL"
              aria-label="Food image URL"
              name="foodUrl"
              value={createFood.foodUrl}
              onChange={onChangeHandler}
              required
            />
            <input
              className="review-input"
              type="url"
              placeholder="Flag image URL (optional)"
              aria-label="Flag image URL"
              name="flagUrl"
              value={createFood.flagUrl}
              onChange={onChangeHandler}
            />
            <input
              className="review-input"
              type="text"
              placeholder="Name"
              aria-label="Name"
              name="name"
              value={createFood.name}
              onChange={onChangeHandler}
              required
            />
            <input
              className="review-input"
              type="text"
              placeholder="Origin"
              aria-label="Origin"
              name="origin"
              value={createFood.origin}
              onChange={onChangeHandler}
              required
            />
            <input
              className="review-input"
              type="text"
              placeholder="Ingredients (optional)"
              aria-label="Ingredients"
              name="ingredients"
              value={createFood.ingredients}
              onChange={onChangeHandler}
            />
            <Button className="listBtn" variant="light" type="submit">
              Add food
            </Button>
          </form>

          {list.length === 0 ? (
            <p className="empty-note list-empty">
              Your list is empty. Add foods from Explore or create your own.
            </p>
          ) : (
            <ul className="food-cards-container">
              {list.map((item) => (
                <li key={item._id} className="list-card">
                  <img className="img-list" src={item.foodUrl} alt={item.name} />
                  <div className="list-body">
                    <h3>{item.name}</h3>
                    <p className="listOrigin">
                      {item.flagUrl && <img src={item.flagUrl} alt="" />}
                      <span>{item.origin}</span>
                    </p>
                    {item.ingredients && (
                      <p className="listIngredients">{item.ingredients}</p>
                    )}
                    <Button
                      variant="outline-danger"
                      size="sm"
                      className="list-delete"
                      onClick={() => removeFromList(item._id)}
                    >
                      Remove
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyList;
