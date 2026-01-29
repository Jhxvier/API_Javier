import "reflect-metadata";
import { DataSource } from "typeorm";
import { Usuario } from "./entities/Usuario";
import { Cliente } from "./entities/Cliente";
import { Producto } from "./entities/Producto";
import { Categoria } from "./entities/Categoria";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "1234", // ajusta
  database: "miappserver", // crea esta DB
  synchronize: false, // solo desarrollo
  logging: false,
  entities: [Usuario, Cliente, Producto, Categoria],
});
