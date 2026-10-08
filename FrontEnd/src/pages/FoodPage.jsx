import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { API_URL } from "../consts-data";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Button from "react-bootstrap/Button";

const FoodPage = () => {
  const { foodId } = useParams();
  const [food, setFood] = useState({});
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [error, setError] = useState("");
  const [confirmMessage, setConfirmMessage] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [reviewText, setReviewText] = useState("");
  const [editingId, setEditingId] = useState("");
  const loggedIn = Boolean(localStorage.getItem("token"));

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = token
      ? `Bearer ${token}`
      : "";
    const fetchData = async () => {
      try {
        const res = await axios.get(`${API_URL}/foods/${foodId}`);
        setFood(res.data.data);
      } catch (err) {
        console.log(err);
        setLoadError(true);
      } finally {
        setLoading(false);
      }
    };
    const getCurrentUser = async () => {
      if (!token) return;
      try {
        const res = await axios.get(`${API_URL}/user`);
        setCurrentUser(res.data.data);
      } catch (err) {
        console.error("Error fetching current user:", err);
      }
    };
    fetchData();
    getCurrentUser();
  }, [foodId]);

  const flash = (setter, message) => {
    setter(message);
    setTimeout(() => setter(""), 3000);
  };

  const refreshFood = async () => {
    const res = await axios.get(`${API_URL}/foods/${foodId}`);
    setFood(res.data.data);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      let res;
      if (editingId) {
        res = await axios.patch(`${API_URL}/foods/${foodId}/${editingId}`, {
          text: reviewText,
        });
      } else {
        res = await axios.post(`${API_URL}/foods/${foodId}`, {
          text: reviewText,
        });
      }
      setReviewText("");
      setEditingId("");
      flash(setConfirmMessage, res.data.message || res.data.msg);
      await refreshFood();
    } catch (err) {
      flash(setError, err.response?.data?.message || "Something went wrong");
    }
  };

  const startEdit = (review) => {
    setReviewText(review.text);
    setEditingId(review._id);
  };

  const cancelEdit = () => {
    setReviewText("");
    setEditingId("");
  };

  if (loading) {
    return <p className="page-message">Loading…</p>;
  }
  if (loadError) {
    return (
      <p className="page-message">
        We couldn’t find that food. <Link to="/explore">Back to Explore</Link>
      </p>
    );
  }

  return (
    <div className="food-page">
      <Link to="/explore" className="back-link">
        ← All foods
      </Link>
      <section className="food-header">
        <div className="header-left">
          <h1 className="inv-title">{food.name}</h1>
          <h2 className="inv-origin">
            {food.flagUrl && <img src={food.flagUrl} alt="" />}
            {food.origin}
          </h2>
        </div>
        <div className="header-right">
          <img src={food.foodUrl} alt={food.name} />
        </div>
      </section>

      <p className="inv-desc">{food.description}</p>

      <section className="tabs-section">
        <Tabs defaultActiveKey="Reviews" id="food-tabs" className="tabs" fill>
          <Tab eventKey="Reviews" title="Reviews">
            <div className="main-container">
              {food.reviews?.length ? (
                <ul className="review-list">
                  {food.reviews.map((review) => (
                    <li key={review._id} className="posted">
                      <span>{review.text}</span>
                      {currentUser && review.createdBy === currentUser._id && (
                        <Button
                          variant="light"
                          size="sm"
                          onClick={() => startEdit(review)}
                        >
                          Edit
                        </Button>
                      )}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="empty-note">No reviews yet. Be the first!</p>
              )}

              <form className="review-form" onSubmit={onSubmit}>
                {confirmMessage && (
                  <p className="success-review" role="status">
                    {confirmMessage}
                  </p>
                )}
                {error && (
                  <p className="error-review" role="alert">
                    {error}
                  </p>
                )}
                {loggedIn ? (
                  <div className="input-review">
                    <input
                      className="review-input"
                      type="text"
                      placeholder={
                        editingId ? "Edit your review" : "Write a review"
                      }
                      aria-label="Review"
                      onChange={(e) => setReviewText(e.target.value)}
                      value={reviewText}
                    />
                    <Button variant="light" type="submit">
                      {editingId ? "Update" : "Submit"}
                    </Button>
                    {editingId && (
                      <Button variant="outline-light" onClick={cancelEdit}>
                        Cancel
                      </Button>
                    )}
                  </div>
                ) : (
                  <p className="login-note">
                    <Link to="/login">Log in</Link> to write a review
                  </p>
                )}
              </form>
            </div>
          </Tab>
          <Tab className="recipe" eventKey="Recipe" title="Recipe">
            <div className="main-container recipe-body">
              {food.ingredients || "No recipe has been added yet."}
            </div>
          </Tab>
        </Tabs>
      </section>
    </div>
  );
};

export default FoodPage;
