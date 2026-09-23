import {
  IsInt,
  IsNotEmpty,
  IsNumber,
} from 'class-validator';

export class CreateEvolucaoDto {
  @IsNotEmpty()
  @IsInt()
  id_aluno: number;

  @IsNotEmpty()
  @IsNumber()
  peso: number;

  @IsNotEmpty()
  @IsNumber()
  carga: number;
}
