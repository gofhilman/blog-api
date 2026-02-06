import { Router } from "express";
import { loginPost, meGet, signupPost } from "../controllers/authController";
import { validateLogin, validateSignup } from "../middleware/validators";
import { handleValidation } from "../middleware/handleValidation";
import { isAuth } from "../middleware/auth";

const authRouter = Router();

authRouter.get("/me", isAuth, meGet);

authRouter.post("/signup", validateSignup, handleValidation, signupPost);
authRouter.post("/login", validateLogin, handleValidation, loginPost);

export default authRouter;
