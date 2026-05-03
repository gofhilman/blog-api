import { Router } from "express";
import { unreadCommentsGet } from "../controllers/commentsController";

const commentsRouter = Router();

commentsRouter.get("/unread", unreadCommentsGet);

export default commentsRouter;
