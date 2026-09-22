import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('aluno')
  loginAluno(
    @Body()
    dados: {
      email: string;
      senha: string;
    },
  ) {
    return this.authService.loginAluno(dados.email, dados.senha);
  }

  @Post('professor')
  loginProfessor(
    @Body()
    dados: {
      email: string;
      senha: string;
    },
  ) {
    return this.authService.loginProfessor(dados.email, dados.senha);
  }
}
