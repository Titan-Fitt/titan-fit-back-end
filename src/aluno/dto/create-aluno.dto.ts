import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateAlunoDto {
  @IsNotEmpty()
  @IsString()
  nome: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  senha: string;

  @IsNotEmpty()
  @IsString()
  cpf: string;
}
