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
import { isAdminAuth, isMemberAuth } from "../middleware/auth";
import { validateComment, validatePost } from "../middleware/validators";
import { handleValidation } from "../middleware/handleValidation";

const postsRouter = Router();

postsRouter.get("/", postsGet);
postsRouter.get("/:postUri", specificPostGet);
postsRouter.get("/:postUri/comments", commentsGet);

postsRouter.post("/", isAdminAuth, validatePost, handleValidation, postPost);
postsRouter.post(
  "/:postUri/comments",
  isMemberAuth,
  validateComment,
  handleValidation,
  commentPost,
);

postsRouter.put(
  "/:postUri",
  isAdminAuth,
  validatePost,
  handleValidation,
  postPut,
);
postsRouter.put(
  "/:postUri/comments/:commentId",
  isMemberAuth,
  validateComment,
  handleValidation,
  commentPut,
);

postsRouter.patch("/:postUri", isAdminAuth, postPublishedPatch);

postsRouter.delete("/:postUri", isAdminAuth, postDelete);
postsRouter.delete(
  "/:postUri/comments/:commentId",
  isMemberAuth,
  commentDelete,
);

export default postsRouter;
