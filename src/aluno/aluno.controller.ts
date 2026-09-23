import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AlunoService } from './aluno.service';
import { CreateAlunoDto } from './dto/create-aluno.dto';
import { LoginAlunoDto } from './dto/login-aluno.dto';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';

@Controller('aluno')

export class AlunoController {

  constructor(

    private readonly alunoService: AlunoService

  ) {}

  @Post('cadastro')

  cadastro(@Body() dados: CreateAlunoDto) {

    return this.alunoService.cadastro(dados);

  }

  @Post('login')

  login(@Body() dados: LoginAlunoDto) {

    return this.alunoService.login(dados);

  }

  @UseGuards(AuthGuard)
  @Get()
  listar() {
    return this.alunoService.listar();

  }

  @Get(':id')

  buscarPorId(@Param('id') id: string) {

    return this.alunoService.buscarPorId(Number(id));

  }

}
