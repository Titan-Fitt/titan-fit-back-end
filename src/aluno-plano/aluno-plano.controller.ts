import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AlunoPlanoService } from './aluno-plano.service';
import { CreateAlunoPlanoDto } from './dto/create-aluno-plano.dto';

@Controller('aluno-plano')
export class AlunoPlanoController {
  constructor(
    private readonly alunoPlanoService: AlunoPlanoService
  ) {}

  @Post()
  cadastrar(@Body() dados: CreateAlunoPlanoDto) {
    return this.alunoPlanoService.cadastrar(dados);
  }

  @Get()
  listar() {
    return this.alunoPlanoService.listar();
  }

  @Get('aluno/:id')
  buscarPorAluno(@Param('id') id: string) {
    return this.alunoPlanoService.buscarPorAluno(Number(id));
  }

  @Get('plano/:id')
  buscarPorPlano(@Param('id') id: string) {
    return this.alunoPlanoService.buscarPorPlano(Number(id));
  }

  @Get(':id')
  buscarPorId(@Param('id') id: string) {
    return this.alunoPlanoService.buscarPorId(Number(id));
  }
}
