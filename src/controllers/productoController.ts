import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Producto } from "../entities/Producto";

export class ProductoController {
  static getAll = async (req: Request, res: Response) => {
    try {
      const repo = AppDataSource.getRepository(Producto);
      const productos = await repo.find();

      return res.status(200).json(productos);
    } catch (error) {
      return res.status(500).json({ message: "Error interno del servidor" });
    }
  };

  static crear = async (req: Request, res: Response) => {
    try {
      const { nombre, precio, stock } = req.body;

      if (!nombre) {
        return res.status(400).json({ message: "El nombre es obligatorio" });
      }

      if (precio <= 0) {
        return res
          .status(400)
          .json({ message: "El precio debe ser mayor a 0" });
      }

      if (stock < 0) {
        return res
          .status(400)
          .json({ message: "El stock no puede ser negativo" });
      }

      const repo = AppDataSource.getRepository(Producto);
      const producto = repo.create({ nombre, precio, stock });

      await repo.save(producto);

      return res.status(201).json(producto);
    } catch (error) {
      return res.status(500).json({ message: "Error interno del servidor" });
    }
  };
}
