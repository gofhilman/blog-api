import { Router } from "express";
import {
  commentDelete,
  commentPost,
  commentPut,
  commentsGet,
  postDelete,
  postPost,
  postPut,
  postsGet,
  specificPostGet,
} from "../controllers/postsController";

const postsRouter = Router();

postsRouter.get("/", postsGet);
postsRouter.get("/:postUri", specificPostGet);
postsRouter.get("/:postUri/comments", commentsGet);

postsRouter.post("/", postPost);
postsRouter.post("/:postUri/comments", commentPost);

postsRouter.put("/:postUri", postPut);
postsRouter.put("/:postUri/comments/:commentId", commentPut);

postsRouter.delete("/:postUri", postDelete);
postsRouter.delete("/:postUri/comments/:commentId", commentDelete);

export default postsRouter;
