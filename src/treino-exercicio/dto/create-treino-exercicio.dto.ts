import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
export class CreateTreinoExercicioDto {
  @IsNotEmpty()
  @IsNumber()
  carga: number;
  @IsNotEmpty()
  @IsInt()
  ordem: number;
  @IsNotEmpty()
  @IsInt()
  serie: number;
  @IsNotEmpty()
  @IsInt()
  repeticoes: number;
  @IsNotEmpty()
  @IsInt()
  descanso: number;
  @IsOptional()
  @IsString()
  observacao?: string;
  @IsNotEmpty()
  @IsInt()
  id_exercicio: number;
  @IsNotEmpty()
  @IsInt()
  id_treino: number;
}
