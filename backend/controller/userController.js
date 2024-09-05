import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import asyncHandler from "../middlewares/asyncHandler.js";
import generateToken from "../utils/createToken.js";

const createUser = async (req, res) => {
  // console.log(req.body);
  try {
    const { username, email, password } = req.body;
    // console.log(username, email, password);

    if (!username || !email || !password) {
      return res.status(404).json("Please fill the necessary inputs");
    }

    const userExists = await User.findOne({ email });
    if (userExists) res.status(400).json("User Already exists");

    // bcrypt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ username, email, password: hashedPassword });

    try {
      await newUser.save();
      generateToken(res, newUser._id);

      res.status(201).json({
        // _id: newUser._id,
        // username: newUser.username,
        message: "User created",
        data: newUser,
      });
    } catch (error) {
      res.status(400).json("Invalid user data");
    }
  } catch (err) {
    console.log(err);
    return res.status(400).json(err);
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) throw new Error("No such User");

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (isPasswordValid) {
    generateToken(res, user._id);

    res.status(201).json({
      message: "user logged In",
      data: user,
      // username: user.username,
    });
  } else {
    res.status(401).json({
      message: "Wrong Password",
    });
  }
};

const logoutUser = async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({
    message: "User logged out",
  });
};

const getAllUsers = async (req, res) => {
  const users = await User.find({});
  res.status(200).json({
    data: users,
  });
};

const getCurrentUserProfile = async (req, res) => {
  // console.log(req);

  const user = await User.findById(req.user._id);
  if (user) {
    res.status(201).json({
      // id:user._id,
      data: user,
    });
  } else {
    res.status(404).json({
      message: "User not found!",
    });
  }
};

const updateCurrentUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id);
  try {
    if (user) {
      const userExists = await User.findOne({ email: req.body.email });
      if (userExists && user.email != userExists.email) {
        return res.status(400).json("User Already exists");
      }

      user.username = req.body.username || user.username;
      user.email = req.body.email || user.email;
      if (req.body.password) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        user.password = hashedPassword;
      }
      const updatedUser = await user.save();

      res.json({
        message: "Updated data",
        data: updatedUser,
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  } catch (err) {
    // console.log(err);
    res.status(400).json(err);
  }
};

const deleteUserById = async (req, res) => {
  // console.log(req.params);
  const user = await User.findById(req.params.id);

  if (user) {
    if (user.isAdmin) {
      res.status(400);
      throw new Error("Cannot delete Admin User");
    }
    await User.deleteOne({ _id: user._id });
    res.json({
      message: "User removed",
      data: user,
    });
  } else {
    res.status(404);
    throw new Error("user not found");
  }
};

const getUserById = async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("user not found");
  }
};

const updateUserById = async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    user.isAdmin = Boolean(req.body.isAdmin);

    const updatedUser = await user.save();

    res.json({
      message: "user profile updated",
      data: updatedUser,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
};

export {
  createUser,
  loginUser,
  logoutUser,
  getAllUsers,
  getCurrentUserProfile,
  updateCurrentUserProfile,
  deleteUserById,
  getUserById,
  updateUserById,
};
