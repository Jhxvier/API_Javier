import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Factura } from "./Factura";

@Entity()
export class Cliente {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nombre!: string;

  @Column({ unique: true })
  correo!: string;

  @Column({ nullable: true })
  telefono?: string;

  @Column({ default: true })
  activo!: boolean;

  @OneToMany(() => Factura, (factura) => factura.cliente)
  facturas!: Factura[];

  @CreateDateColumn({ name: "fecha_creacion" })
  fechaCreacion!: Date;

  @UpdateDateColumn({ name: "fecha_actualizacion" })
  fechaActualizacion!: Date;
}
