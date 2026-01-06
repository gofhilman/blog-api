import { Router } from "express";

const postsRouter = Router();

postsRouter.get("/");
postsRouter.get("/:postId");
postsRouter.get("/:postId/comments");

postsRouter.post("/");
postsRouter.post("/:postId/comments");

postsRouter.put("/:postId");
postsRouter.put("/:postId/comments/:commentId");

postsRouter.delete("/:postId");
postsRouter.delete("/:postId/comments/:commentId");

export default postsRouter;
