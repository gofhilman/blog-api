import { Router } from "express";

const authRouter = Router();

authRouter.post("/login");
authRouter.post("/signup");

export default authRouter;
