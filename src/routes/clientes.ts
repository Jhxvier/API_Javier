import { Router } from "express";
import { ClienteController } from "../controllers/clienteControllers";

const router = Router();

router.get("/", ClienteController.getActivos);
router.post("/", ClienteController.crear);

export default router;
