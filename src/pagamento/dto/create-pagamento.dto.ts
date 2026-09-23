import {
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreatePagamentoDto {
  @IsNotEmpty()
  @IsNumber()
  valor: number;

  @IsNotEmpty()
  @IsString()
  metodo: string;

  @IsNotEmpty()
  @IsString()
  status: string;

  @IsOptional()
  @IsDateString()
  data?: string;

  @IsOptional()
  @IsString()
  comprovante?: string;

  @IsNotEmpty()
  @IsInt()
  id_aluno_plano: number;
}
