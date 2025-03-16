import { Router } from "express";
import { addController, accessController } from "../Dependecies";

const router = Router();

router.post('/create', addController.run.bind(addController));

router.post('/access', accessController.run.bind(accessController));

export default router;
