import { Body, Controller, Get, Post } from '@nestjs/common';
import { AlunoService } from './aluno.service';
import { CreateAlunoDto } from './dto/create-aluno.dto';
import { LoginAlunoDto } from './dto/login-aluno.dto';

@Controller('aluno')
export class AlunoController {
  constructor(private readonly alunoService: AlunoService) {}

  @Post('cadastro')
  cadastro(@Body() dados: CreateAlunoDto) {
    return this.alunoService.cadastro(dados);
  }

  @Post('login')
  login(@Body() dados: LoginAlunoDto) {
    return this.alunoService.login(dados);

  }

  @Get()
  listar() {
    return this.alunoService.listar();
  }
}
