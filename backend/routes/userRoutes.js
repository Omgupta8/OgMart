import express from "express";
import {
  createUser,
  loginUser,
  logoutUser,
  getAllUsers,
  getCurrentUserProfile,
  updateCurrentUserProfile,
  deleteUserById,
  getUserById,
  updateUserById,
} from "../controller/userController.js";
const userRouter = express.Router();

import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";

userRouter
  .route("/")
  .post(createUser)
  .get(authenticate, authorizeAdmin, getAllUsers);

userRouter.post("/auth", loginUser);

userRouter.post("/logout", logoutUser);

userRouter
  .route("/profile")
  .get(authenticate, getCurrentUserProfile)
  .put(authenticate, updateCurrentUserProfile);

userRouter
  .route("/:id")
  .delete(authenticate, authorizeAdmin, deleteUserById)
  .get(authenticate, authorizeAdmin, getUserById)
  .put(authenticate, authorizeAdmin, updateUserById);

export default userRouter;