import { Router } from "express";
import {
  categoriedPostsGet,
  categoriesGet,
  categoryDelete,
  categoryPost,
  categoryPut,
} from "../controllers/categoriesController";

const categoriesRouter = Router();

categoriesRouter.get("/", categoriesGet);
categoriesRouter.get("/:categoryUri/posts", categoriedPostsGet);

categoriesRouter.post("/", categoryPost);

categoriesRouter.put("/:categoryUri", categoryPut);

categoriesRouter.delete("/:categoryUri", categoryDelete);

export default categoriesRouter;
