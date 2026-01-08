import { Router } from "express";
import {
  categoriesGet,
  categoryDelete,
  categoryPost,
  categoryPut,
  specificCategoryGet,
} from "../controllers/categoriesController";
import auth from "../middleware/auth";

const categoriesRouter = Router();

categoriesRouter.get("/", categoriesGet);
categoriesRouter.get("/:categoryUri", specificCategoryGet);

categoriesRouter.post("/", auth, categoryPost);

categoriesRouter.put("/:categoryUri", auth, categoryPut);

categoriesRouter.delete("/:categoryUri", auth, categoryDelete);

export default categoriesRouter;
