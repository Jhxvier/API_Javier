import { Router } from "express";
import { FacturasController } from "../controllers/facturaController";

const router = Router();

router.get("/:id", FacturasController.verFactura);
router.post("/", FacturasController.crear);

export default router;
