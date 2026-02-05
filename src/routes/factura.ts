import { Router } from "express";
import { FacturaController } from "../controllers/facturaController";

const router = Router();

router.get("/:id", FacturaController.getFacturaById);
router.post("/", FacturaController.createFactura);

export default router;
