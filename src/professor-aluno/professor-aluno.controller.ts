import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { ProfessorAlunoService } from './professor-aluno.service';

import { CreateProfessorAlunoDto } from './dto/create-professor-aluno.dto';

@Controller('professor-aluno')

export class ProfessorAlunoController {

  constructor(

    private readonly professorAlunoService: ProfessorAlunoService

  ) {}

  @Post()

  cadastrar(@Body() dados: CreateProfessorAlunoDto) {

    return this.professorAlunoService.cadastrar(dados);

  }

  @Get()

  listar() {

    return this.professorAlunoService.listar();

  }

  @Get('professor/:id')

  buscarPorProfessor(@Param('id') id: string) {

    return this.professorAlunoService.buscarPorProfessor(Number(id));

  }

  @Get('aluno/:id')

  buscarPorAluno(@Param('id') id: string) {

    return this.professorAlunoService.buscarPorAluno(Number(id));

  }

  @Get(':id')

  buscarPorId(@Param('id') id: string) {

    return this.professorAlunoService.buscarPorId(Number(id));

  }

}
 