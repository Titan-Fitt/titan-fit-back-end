import {
  IsInt,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class CreateProfessorAlunoDto {

  @IsNotEmpty()
  @IsInt()
  id_professor: number;
}