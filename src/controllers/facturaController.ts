import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Factura } from "../entities/Factura";
import { DetalleFactura } from "../entities/DetalleFactura";

export class FacturasController {
  // CREAR FACTURA CON DETALLES
  static crear = async (req: Request, res: Response) => {
    const { numero, clienteId, detalles } = req.body;

    // Validaciones mínimas
    if (
      !numero ||
      !clienteId ||
      !Array.isArray(detalles) ||
      detalles.length === 0
    ) {
      return res.status(400).json({
        message:
          "Datos inválidos: numero, clienteId y detalles son requeridos.",
      });
    }

    for (const d of detalles) {
      if (
        !d.productoId ||
        !Number.isInteger(d.cantidad) ||
        d.cantidad <= 0 ||
        Number(d.precioUnitario) <= 0
      ) {
        return res.status(400).json({
          message:
            "Detalle inválido (productoId, cantidad>0, precioUnitario>0).",
        });
      }
    }

    try {
      const resultado = await AppDataSource.transaction(async (manager) => {
        // 1) Calcular totales y crear líneas de detalle
        const lineas: DetalleFactura[] = detalles.map((d: any) => {
          const linea = new DetalleFactura();
          linea.productoId = d.productoId;
          linea.cantidad = d.cantidad;
          linea.precioUnitario = Number(d.precioUnitario);
          linea.subtotalLinea = Number(
            (linea.cantidad * linea.precioUnitario).toFixed(2),
          );
          return linea;
        });

        const subtotal = Number(
          lineas
            .reduce((acc, l) => acc + Number(l.subtotalLinea), 0)
            .toFixed(2),
        );
        const impuesto = Number((subtotal * 0.13).toFixed(2)); // IVA 13%
        const total = Number((subtotal + impuesto).toFixed(2));

        // 2) Crear la factura
        const factura = new Factura();
        factura.numero = numero;
        factura.clienteId = clienteId;
        factura.subtotal = subtotal;
        factura.impuesto = impuesto;
        factura.total = total;

        // 3) Asignar detalles y guardar (cascade insert)
        factura.detalles = lineas;

        // Guardado con manager dentro de la transacción
        return await manager.save(Factura, factura);
      });

      return res.status(201).json({ ok: true, factura: resultado });
    } catch (error: any) {
      return res.status(500).json({
        ok: false,
        message: "Error al guardar la factura.",
        detail: String(error?.message ?? error),
      });
    }
  };

  // VER FACTURA POR ID CON DETALLES
  static verFactura = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      const facturaRepo = AppDataSource.getRepository(Factura);
      const factura = await facturaRepo.findOne({
        where: { id: Number(id) },
        relations: ["detalles", "cliente"], // trae los detalles y cliente
      });

      if (!factura) {
        return res.status(404).json({ message: "Factura no encontrada" });
      }

      return res.json({ ok: true, factura });
    } catch (error) {
      return res
        .status(500)
        .json({ ok: false, message: "Error al obtener la factura", error });
    }
  };
}
