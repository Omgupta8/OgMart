import express from "express";
import {
  createCategory,
  updateCategory,
  removeCategory,
  listCategory,
  readCategory,
} from "../controller/categoryController.js";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";
const categoryRouter = express.Router();

categoryRouter.route("/").post(authenticate, authorizeAdmin, createCategory);
categoryRouter
  .route("/:categoryId")
  .put(authenticate, authorizeAdmin, updateCategory);
categoryRouter
  .route("/:categoryId")
  .delete(authenticate, authorizeAdmin, removeCategory);

categoryRouter.route("/categories").get(listCategory);
categoryRouter.route("/:id").get(readCategory);

export default categoryRouter;
