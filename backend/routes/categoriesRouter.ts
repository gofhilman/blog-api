import { Router } from "express";
import {
  categoriesGet,
  categoryDelete,
  categoryPost,
  categoryPut,
  specificCategoryGet,
} from "../controllers/categoriesController";

const categoriesRouter = Router();

categoriesRouter.get("/", categoriesGet);
categoriesRouter.get("/:categoryUri", specificCategoryGet);

categoriesRouter.post("/", categoryPost);

categoriesRouter.put("/:categoryUri", categoryPut);

categoriesRouter.delete("/:categoryUri", categoryDelete);

export default categoriesRouter;
