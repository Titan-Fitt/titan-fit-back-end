import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateProfessorDto {
  @IsNotEmpty()
  @IsString()
  nome: string;

  @IsOptional()
  @IsString()
  curriculo?: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  senha: string;

  @IsNotEmpty()
  @IsString()
  registro_cref: string;

  @IsOptional()
  @IsString()
  bacharelado?: string;

  @IsOptional()
  @IsString()
  formacao_academica?: string;

  @IsNotEmpty()
  @IsString()
  status: string;

  @IsOptional()
  @IsString()
  especialidade?: string;
}
