import express from "express";
import {
  loginUser,
  logoutUser,
  registrationUser,
  updateAccessToken,
} from "../controllers/userController";
import { isAuthenticated } from "../middleware/auth";
const userRouter = express.Router();

userRouter.post("/registration", registrationUser);
userRouter.post("/login", loginUser);
userRouter.get("/logout", isAuthenticated, logoutUser);
userRouter.get("/refresh", updateAccessToken);

export default userRouter;
