import jwt from "jsonwebtoken";
import user from "../models/userModel.js";
import User from "../models/userModel.js";

const authenticate = async (req, res, next) => {
  let token;

  // read jwt from the jwt cookie
  token = req.cookies.jwt;
  // console.log(req);

  //   next();
  try {
    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.userId).select("-password");
        next();
      } catch (error) {
        res.status(401).json("Not authorized, token failed");
      }
    } else {
      res.status(401).json("Not authorised, No token found");
    }
  } catch (error) {
    res.status(401).json("Not authorised, No token found");
  }
};

// check for the admin
const authorizeAdmin = async (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else res.status(401).send("Not authorised as an admin ");
};

export { authenticate, authorizeAdmin };
