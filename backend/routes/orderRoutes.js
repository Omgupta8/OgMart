import express from "express";
const orderRouter = express.Router();

import {
  createOrder,
  getAllOrders,
  getUserOrders,
  countTotalOrders,
  calculateTotalSales,
  calculateTotalSalesByDate,
  findOrderByID,
  markOrderAsPaid,
  markOrderAsDelivered,
} from "../controller/orderController.js";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";

orderRouter
  .route("/")
  .post(authenticate, createOrder)
  .get(authenticate, authorizeAdmin, getAllOrders);

orderRouter.route("/mine").get(authenticate, getUserOrders);
orderRouter.route("/total-orders").get(countTotalOrders);
orderRouter.route("/total-sales").get(calculateTotalSales);
orderRouter.route("/total-sales-by-date").get(calculateTotalSalesByDate);
orderRouter.route("/:id").get(authenticate, findOrderByID);
orderRouter.route("/:id/pay").put(authenticate, markOrderAsPaid);
orderRouter
  .route("/:id/deliver")
  .put(authenticate, authorizeAdmin, markOrderAsDelivered);

export default orderRouter;
