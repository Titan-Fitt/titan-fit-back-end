import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class CreateFichaAlunoDto {
  @IsNotEmpty()
  @IsInt()
  idade: number;

  @IsNotEmpty()
  @IsNumber()
  peso: number;

  @IsNotEmpty()
  @IsNumber()
  altura: number;

  @IsNotEmpty()
  @IsString()
  objetivo: string;

  @IsNotEmpty()
  @IsInt()
  id_aluno: number;
}
