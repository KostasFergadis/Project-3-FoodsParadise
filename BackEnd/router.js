import express from "express";
import foodController from "./controllers/foodController.js";
import userController from "./controllers/userController.js";
import { auth } from "./middleware/auth.js";
import reviewController from "./controllers/reviewController.js";
import { body } from "express-validator";
import validate from "./middleware/validate.js";
import { authLimiter } from "./middleware/rateLimit.js";
import myListController from "./controllers/myListController.js";

const router = express.Router();

router
  .route("/foods")
  .get(foodController.getAll)
  .post(auth, foodController.create);

router
  .route("/foods/:id")
  .get(foodController.getById)
  .patch(auth, foodController.updateById)
  .delete(auth, foodController.deleteById);

router
  .route("/register")
  .post(
    authLimiter,
    body("email").isEmail(),
    body("password").isLength({ min: 7 }),
    body("userName").isLength({ min: 3 }),
    validate,
    userController.register
  );
router
  .route("/my-list")
  .get(auth, myListController.grabList)
  .post(auth, myListController.createListFood);
router
  .route("/my-list/:foodId")
  .post(auth, myListController.addFood)
  .delete(auth, myListController.deleteListItem);
// .patch(auth, myListController.updateFoodList);

router
  .route("/login")
  .post(
    authLimiter,
    body("email").isEmail(),
    body("password").isLength({ min: 1 }),
    validate,
    userController.login
  );
router.route("/users").get(auth, userController.getAllUsers);
router.route("/user").get(auth, userController.getCurrentUser);
router
  .route("/foods/:foodId")
  .post(
    auth,
    body("text").trim().isLength({ min: 1 }),
    validate,
    reviewController.createReview
  );
router
  .route("/foods/:foodId/:reviewId")
  .patch(
    auth,
    body("text").trim().isLength({ min: 1 }),
    validate,
    reviewController.updateReview
  )
  .delete(auth, reviewController.deleteReview);
export default router;
