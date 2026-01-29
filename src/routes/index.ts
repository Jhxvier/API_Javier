import { Router } from "express";
import clientesRoutes from "./clientes";
import productosRoutes from "./producto";
import categ from "./categorias";

const router = Router();

// Ruta principal
router.get("/", (req, res) => {
  res.status(200).json({ message: "API activa" });
});

// Subrutas
router.use("/clientes", clientesRoutes);
router.use("/productos", productosRoutes);
router.use("/categorias", categ);

export default router;
