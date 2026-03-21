import { Router } from "express";
import { FacturasController } from "../controllers/facturaController";

const router = Router();

router.post("/", FacturasController.crear);
router.get("/:id", FacturasController.verFactura);
router.get("/", FacturasController.listarActivas);
router.put("/:id", FacturasController.modificar);
router.delete("/:id", FacturasController.eliminarLogico);

export default router;
