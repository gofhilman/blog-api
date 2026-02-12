import { Router } from "express";
import { loginPost, meGet, signupPost } from "../controllers/authController";
import { validateLogin, validateSignup } from "../middleware/validators";
import { isAuth } from "../middleware/auth";

const authRouter = Router();

authRouter.get("/me", isAuth, meGet);

authRouter.post("/signup", validateSignup, signupPost);
authRouter.post("/login", validateLogin, loginPost);

export default authRouter;
