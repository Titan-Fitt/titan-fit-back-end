import {
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class CreateAlunoPlanoDto {
  @IsNotEmpty()
  @IsInt()
  id_aluno: number;

  @IsNotEmpty()
  @IsInt()
  id_plano: number;

  @IsNotEmpty()
  @IsDateString()
  data_inicio: string;

  @IsNotEmpty()
  @IsDateString()
  data_fim: string;

  @IsNotEmpty()
  @IsString()
  status: string;
}
