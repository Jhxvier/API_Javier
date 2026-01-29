import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity({ name: "tbUsuarios" })
export class Usuario {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 50, nullable: false })
  nombre!: string;

  @Column({ length: 50, nullable: false })
  apellido1!: string;

  @Column({ length: 50, nullable: false })
  apellido2!: string;

  @Column({ length: 100, nullable: false, unique: true })
  email!: string;

  @Column({ default: true })
  estado!: boolean;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
