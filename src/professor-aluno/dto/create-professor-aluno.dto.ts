import {
  IsInt,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class CreateProfessorAlunoDto {
  @IsNotEmpty()
  @IsInt()
  id_professor: number;

  @IsNotEmpty()
  @IsInt()
  id_aluno: number;

  @IsNotEmpty()
  @IsString()
  status: string;
}
