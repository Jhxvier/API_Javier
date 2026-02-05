import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Factura } from "../entities/Factura";
import { DetalleFactura } from "../entities/DetalleFactura";
import { Cliente } from "../entities/Cliente";
import { Producto } from "../entities/Producto";

export class FacturaController {
  //OBTENER FACTURA POR ID CON DETALLES Y PRODUCTOS
  static getFacturaById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const repo = AppDataSource.getRepository(Factura);

      const factura = await repo.findOne({
        where: { id: Number(id) },
        relations: {
          cliente: true,
          detalles: {
            producto: true,
          },
        },
      });

      if (!factura) {
        return res.status(404).json({ message: "Factura no encontrada" });
      }

      return res.json(factura);
    } catch {
      return res.status(500).json({ message: "Error al obtener la factura" });
    }
  };

  //CREAR FACTURA CON DETALLES
  static createFactura = async (req: Request, res: Response) => {
    const { clienteId, detalles } = req.body;

    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const clienteRepo = queryRunner.manager.getRepository(Cliente);
      const productoRepo = queryRunner.manager.getRepository(Producto);
      const facturaRepo = queryRunner.manager.getRepository(Factura);
      const detalleRepo = queryRunner.manager.getRepository(DetalleFactura);

      const cliente = await clienteRepo.findOneBy({ id: clienteId });
      if (!cliente) {
        return res.status(404).json({ message: "Cliente no existe" });
      }

      // Crear factura
      const factura = facturaRepo.create({ cliente });
      await facturaRepo.save(factura);

      // Crear detalles
      let contador = 1;
      for (const d of detalles) {
        const producto = await productoRepo.findOneBy({ id: d.idProducto });
        if (!producto) {
          throw new Error("Producto no existe");
        }

        const detalle = detalleRepo.create({
          idFactura: factura.id,
          idDetalle: contador++,
          idProducto: producto.id,
          factura,
          producto,
          cantidad: d.cantidad,
          total: d.cantidad * producto.precio,
        });

        await detalleRepo.save(detalle);
      }

      await queryRunner.commitTransaction();

      return res.status(201).json({
        message: "Factura creada correctamente",
        facturaId: factura.id,
      });
    } catch (error) {
      await queryRunner.rollbackTransaction();
      return res.status(500).json({
        message: "Error al crear la factura",
      });
    } finally {
      await queryRunner.release();
    }
  };
}
