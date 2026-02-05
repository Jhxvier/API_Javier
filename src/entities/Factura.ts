import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
} from "typeorm";
import { Cliente } from "./Cliente";
import { DetalleFactura } from "./DetalleFactura";

@Entity()
export class Factura {
  @PrimaryGeneratedColumn()
  id!: number;

  @CreateDateColumn()
  fecha!: Date;

  @Column({ default: true })
  estado!: boolean;

  @ManyToOne(() => Cliente, (cliente) => cliente.facturas)
  cliente!: Cliente;

  @OneToMany(() => DetalleFactura, (detalle) => detalle.factura, {
    cascade: true,
  })
  detalles!: DetalleFactura[];
}
