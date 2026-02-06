import { Router } from "express";
import {
  categoriesGet,
  categoryDelete,
  categoryPost,
  categoryPut,
  specificCategoryGet,
} from "../controllers/categoriesController";
import { isAdminAuth } from "../middleware/auth";
import { validateCategory } from "../middleware/validators";
import { handleValidation } from "../middleware/handleValidation";

const categoriesRouter = Router();

categoriesRouter.get("/", categoriesGet);
categoriesRouter.get("/:categoryUri", specificCategoryGet);

categoriesRouter.post(
  "/",
  isAdminAuth,
  validateCategory,
  handleValidation,
  categoryPost,
);

categoriesRouter.put(
  "/:categoryUri",
  isAdminAuth,
  validateCategory,
  handleValidation,
  categoryPut,
);

categoriesRouter.delete("/:categoryUri", isAdminAuth, categoryDelete);

export default categoriesRouter;
