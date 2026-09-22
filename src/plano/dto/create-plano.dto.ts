import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreatePlanoDto {
  @IsNotEmpty()
  @IsString()
  nome: string;

  @IsOptional()
  @IsString()
  descricao?: string;

  @IsNotEmpty()
  @IsNumber()
  valor: number;

  @IsNotEmpty()
  @IsString()
  tipo_plano: string;
}
