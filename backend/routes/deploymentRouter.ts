import { Router } from "express";
import {
  deploymentPost,
  latestDeploymentGet,
} from "../controllers/deploymentController";
import { isAdminAuth } from "../middleware/auth";

const deploymentRouter = Router();

deploymentRouter.get("/latest", latestDeploymentGet);
deploymentRouter.post("/", isAdminAuth, deploymentPost);

export default deploymentRouter;
