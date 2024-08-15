import express from "express";
import formidable from "express-formidable";
import checkId from "../middlewares/checkId.js";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";
import {
  addProduct,
  updateProductDetails,
  removeProduct,
  fetchProducts,
  fetchProductById,
  fetchAllProducts,
  addProductReview,
  fetchTopProducts,
  fetchNewProducts,
} from "../controller/productController.js";

const productRouter = express.Router();

productRouter
  .route("/")
  .get(fetchProducts)
  .post(authenticate, authorizeAdmin, formidable(), addProduct);

productRouter.route("/allproducts").get(fetchAllProducts);

productRouter
  .route("/:id/reviews")
  .post(authenticate, authorizeAdmin, checkId, addProductReview);

productRouter.get("/top", fetchTopProducts);
productRouter.get("/new", fetchNewProducts);

productRouter
  .route("/:id")
  .get(fetchProductById)
  .put(authenticate, authorizeAdmin, formidable(), updateProductDetails)
  .delete(authenticate, authorizeAdmin, removeProduct);
export default productRouter;
