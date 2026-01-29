import { Router } from "express";
import categoriaController from "../controllers/categoriaController";

const ROUTES = Router();
ROUTES.get("/", categoriaController.getAllCategorias);
ROUTES.get("/:id", categoriaController.getCategoriaById);
ROUTES.post("/", categoriaController.crearCategoria);
ROUTES.patch("/:id", categoriaController.actualizarCategoria);
ROUTES.delete("/:id", categoriaController.eliminarCategoria);
export default ROUTES;
