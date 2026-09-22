import {
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateExercicioDto {
  @IsNotEmpty()
  @IsString()
  nome: string;

  @IsNotEmpty()
  @IsString()
  grupo_muscular: string;

  @IsOptional()
  @IsString()
  video?: string;
}
