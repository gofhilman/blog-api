import { Router } from "express";
import {
  commentContentPatch,
  commentDelete,
  commentPost,
  commentReadPatch,
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

const postsRouter = Router();

postsRouter.get("/", postsGet);
postsRouter.get("/:postUri", specificPostGet);
postsRouter.get("/:postUri/comments", commentsGet);

postsRouter.post("/", isAdminAuth, validatePost, postPost);
postsRouter.post(
  "/:postUri/comments",
  isMemberAuth,
  validateComment,
  commentPost,
);

postsRouter.put("/:postUri", isAdminAuth, validatePost, postPut);

postsRouter.patch("/:postUri", isAdminAuth, postPublishedPatch);
postsRouter.patch(
  "/:postUri/comments/:commentId/content",
  isMemberAuth,
  validateComment,
  commentContentPatch,
);
postsRouter.patch(
  "/:postUri/comments/:commentId/read",
  isAdminAuth,
  commentReadPatch,
);

postsRouter.delete("/:postUri", isAdminAuth, postDelete);
postsRouter.delete(
  "/:postUri/comments/:commentId",
  isMemberAuth,
  commentDelete,
);

export default postsRouter;
