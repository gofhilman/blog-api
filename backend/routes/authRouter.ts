import { Router } from "express";
import { loginPost, signupPost } from "../controllers/authController";
import { validateLogin, validateSignup } from "../middleware/validators";
import { handleValidation } from "../middleware/handleValidation";

const authRouter = Router();

authRouter.post("/signup", validateSignup, handleValidation, signupPost);
authRouter.post("/login", validateLogin, handleValidation, loginPost);

export default authRouter;
