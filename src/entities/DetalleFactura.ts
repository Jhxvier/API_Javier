import { Entity, Column, ManyToOne, PrimaryColumn, JoinColumn } from "typeorm";
import { Factura } from "./Factura";
import { Producto } from "./Producto";

@Entity()
export class DetalleFactura {
  @PrimaryColumn()
  idFactura!: number;

  @PrimaryColumn()
  idDetalle!: number;

  @Column()
  idProducto!: number;

  @ManyToOne(() => Factura, (factura) => factura.detalles, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "idFactura" })
  factura!: Factura;

  @ManyToOne(() => Producto, { nullable: false })
  @JoinColumn({ name: "idProducto" })
  producto!: Producto;

  @Column()
  cantidad!: number;

  @Column("decimal", { precision: 10, scale: 2 })
  total!: number;
}
