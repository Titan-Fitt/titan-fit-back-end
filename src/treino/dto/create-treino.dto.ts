import {
  IsInt,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class CreateTreinoDto {
  @IsNotEmpty()
  @IsString()
  nome_treino: string;

  @IsNotEmpty()
  @IsString()
  tipo_treino: string;

  @IsNotEmpty()
  @IsString()
  objetivo: string;

  @IsNotEmpty()
  @IsInt()
  id_ficha: number;

  @IsNotEmpty()
  @IsInt()
  id_professor: number;
}
