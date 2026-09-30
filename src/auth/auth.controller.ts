import {Body, Controller, Get, Post, Req, UseGuards,} from '@nestjs/common';
import { AuthService } from './auth.service';import { AuthGuard } from './auth.guard';
@Controller('auth')export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('aluno')
  loginAluno(@Body() dados: { email: string; senha: string }) {
    return this.authService.loginAluno(
      dados.email,
      dados.senha,
    );
  }

@Post('professor')
loginProfessor(@Body() dados: { email: string; senha: string }) {
  return this.authService.loginProfessor(
    dados.email,
    dados.senha,
  );
}
@Post('esqueci-senha')solicitarRecuperacao(
  @Body()
  dados: {
    email: string;
    tipoUsuario: string;
  },
) {
  return this.authService.solicitarRecuperacao(
    dados.email,
    dados.tipoUsuario,
  );
}
@Post('redefinir-senha')redefinirSenha(
  @Body()
  dados: {
    token: string;
    novaSenha: string;
  },
) {
  return this.authService.redefinirSenha(
    dados.token,
    dados.novaSenha,
  );
}
}
