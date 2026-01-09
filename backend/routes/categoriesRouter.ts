import { Router } from "express";
import {
  categoriesGet,
  categoryDelete,
  categoryPost,
  categoryPut,
  specificCategoryGet,
} from "../controllers/categoriesController";
import auth from "../middleware/auth";
import { validateCategory } from "../middleware/validators";
import { handleValidation } from "../middleware/handleValidation";

const categoriesRouter = Router();

categoriesRouter.get("/", categoriesGet);
categoriesRouter.get("/:categoryUri", specificCategoryGet);

categoriesRouter.post(
  "/",
  auth,
  validateCategory,
  handleValidation,
  categoryPost
);

categoriesRouter.put(
  "/:categoryUri",
  auth,
  validateCategory,
  handleValidation,
  categoryPut
);

categoriesRouter.delete("/:categoryUri", auth, categoryDelete);

export default categoriesRouter;
