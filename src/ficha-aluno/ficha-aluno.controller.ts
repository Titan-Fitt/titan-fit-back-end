import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { FichaAlunoService } from './ficha-aluno.service';
import { CreateFichaAlunoDto } from './dto/create-ficha-aluno.dto';

@Controller('ficha-aluno')
export class FichaAlunoController {
  constructor(
    private readonly fichaAlunoService: FichaAlunoService 
  ) {}

  @Post()
  cadastrar(@Body() dados: CreateFichaAlunoDto) {
    return this.fichaAlunoService.cadastrar(dados);
  }

  @Get()
  listar() {
    return this.fichaAlunoService.listar();
  }

  @Get('aluno/:id')
  buscarPorAluno(@Param('id') id: string) {
    return this.fichaAlunoService.buscarPorAluno(Number(id));
  }

  @Put('aluno/:id')
  atualizar(
    @Param('id') id: string,
    @Body() dados: CreateFichaAlunoDto
  ) {

    return this.fichaAlunoService.atualizar(
      Number(id),
      dados
    );
  }
}
