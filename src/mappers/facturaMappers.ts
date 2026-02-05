import { Factura } from "../entities/Factura";
import { DetalleFactura } from "../entities/DetalleFactura";
import {
  FacturaResponseDto,
  DetalleFacturaResponseDto,
} from "../dtos/facturaDto";

export class FacturaMapper {
  static toDetalleDto(detalle: DetalleFactura): DetalleFacturaResponseDto {
    return {
      productoId: detalle.productoId,
      cantidad: detalle.cantidad,
      precioUnitario: detalle.precioUnitario,
      subtotalLinea: detalle.subtotalLinea,
    };
  }

  static toFacturaDto(factura: Factura): FacturaResponseDto {
    return {
      id: factura.id,
      numero: factura.numero,
      clienteId: factura.clienteId,
      clienteNombre: factura.cliente.nombre,
      subtotal: factura.subtotal,
      impuesto: factura.impuesto,
      total: factura.total,
      detalles: factura.detalles.map(this.toDetalleDto),
    };
  }
}
