import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Cliente } from "../entities/Cliente";

export class ClienteController {
  static getActivos = async (req: Request, res: Response) => {
    try {
      const repo = AppDataSource.getRepository(Cliente);
      const clientes = await repo.find({ where: { activo: true } });

      return res.status(200).json(clientes);
    } catch (error) {
      return res.status(500).json({ message: "Error interno del servidor" });
    }
  };

  static crear = async (req: Request, res: Response) => {
    try {
      const { nombre, correo, telefono } = req.body;

      // Validaciones
      if (!nombre) {
        return res.status(400).json({ message: "El nombre es obligatorio" });
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(correo)) {
        return res.status(400).json({ message: "Correo inválido" });
      }

      const repo = AppDataSource.getRepository(Cliente);
      const cliente = repo.create({ nombre, correo, telefono });

      await repo.save(cliente);

      return res.status(201).json(cliente);
    } catch (error) {
      return res.status(500).json({ message: "Error interno del servidor" });
    }
  };
}
