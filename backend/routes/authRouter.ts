import { Router } from "express";
import { loginPost, signupPost } from "../controllers/authController";

const authRouter = Router();

authRouter.post("/signup", signupPost);
authRouter.post("/login", loginPost);

export default authRouter;
