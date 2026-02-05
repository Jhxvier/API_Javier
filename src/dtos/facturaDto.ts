import { IsArray, IsInt, Min, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

class DetalleFacturaDto {
  @IsInt()
  @Min(1)
  productoId!: number;

  @IsInt()
  @Min(1)
  cantidad!: number;
}

export class CrearFacturaDto {
  @IsInt()
  @Min(1)
  clienteId!: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetalleFacturaDto)
  detalles!: DetalleFacturaDto[];
}
