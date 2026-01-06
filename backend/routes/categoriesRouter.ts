import { Router } from "express";

const categoriesRouter = Router();

categoriesRouter.get("/");
categoriesRouter.get("/:categoryId/posts");

categoriesRouter.post("/");

categoriesRouter.put("/:categoryId");

categoriesRouter.delete("/:categoryId");

export default categoriesRouter;
