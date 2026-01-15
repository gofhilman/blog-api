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
import { validateComment, validatePost } from "../middleware/validators";
import { handleValidation } from "../middleware/handleValidation";

const postsRouter = Router();

postsRouter.get("/", postsGet);
postsRouter.get("/:postUri", specificPostGet);
postsRouter.get("/:postUri/comments", commentsGet);

postsRouter.post("/", auth, validatePost, handleValidation, postPost);
postsRouter.post(
  "/:postUri/comments",
  auth,
  validateComment,
  handleValidation,
  commentPost
);

postsRouter.put("/:postUri", auth, validatePost, handleValidation, postPut);
postsRouter.put(
  "/:postUri/comments/:commentId",
  auth,
  validateComment,
  handleValidation,
  commentPut
);

postsRouter.patch("/:postUri", auth, postPublishedPatch);

postsRouter.delete("/:postUri", auth, postDelete);
postsRouter.delete("/:postUri/comments/:commentId", auth, commentDelete);

export default postsRouter;
