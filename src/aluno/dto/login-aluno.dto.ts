import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginAlunoDto {

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  senha: string;

}