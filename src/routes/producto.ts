import { Router } from "express";
import { ProductoController } from "../controllers/productoController";

const router = Router();

router.get("/", ProductoController.getAll);
router.post("/", ProductoController.crear);

export default router;
