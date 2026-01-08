import { Router } from "express";
import {
  commentDelete,
  commentPost,
  commentPut,
  commentsGet,
  postDelete,
  postPost,
  postPublishedPatch,
  postPut,
  postsGet,
  specificPostGet,
} from "../controllers/postsController";
import auth from "../middleware/auth";

const postsRouter = Router();

postsRouter.get("/", postsGet);
postsRouter.get("/:postUri", specificPostGet);
postsRouter.get("/:postUri/comments", auth, commentsGet);

postsRouter.post("/", auth, postPost);
postsRouter.post("/:postUri/comments", auth, commentPost);

postsRouter.put("/:postUri", auth, postPut);
postsRouter.put("/:postUri/comments/:commentId", auth, commentPut);

postsRouter.patch("/:postUri", auth, postPublishedPatch);

postsRouter.delete("/:postUri", auth, postDelete);
postsRouter.delete("/:postUri/comments/:commentId", auth, commentDelete);

export default postsRouter;
