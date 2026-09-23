import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginProfessorDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  senha: string;
}
