import {

  Body,

  Controller,

  Get,

  Param,

  Post,

  Req,

  UseGuards,

} from '@nestjs/common';

import { ProfessorAlunoService } from './professor-aluno.service';

import { CreateProfessorAlunoDto } from './dto/create-professor-aluno.dto';

import { AuthGuard } from '../auth/auth.guard';

import { ProfessorGuard } from '../auth/professor.guard';

@Controller('professor-aluno')

export class ProfessorAlunoController {

  constructor(

    private readonly professorAlunoService: ProfessorAlunoService,

  ) {}

  @UseGuards(ProfessorGuard)

  @Post()

  cadastrar(

    @Body() dados: CreateProfessorAlunoDto,

    @Req() request: any,

  ) {

    return this.professorAlunoService.cadastrar(

      dados,

      request.user.id,

    );

  }

  @UseGuards(AuthGuard)

  @Get()

  listar() {

    return this.professorAlunoService.listar();

  }

  @UseGuards(AuthGuard)

  @Get('professor/:id')

  buscarPorProfessor(@Param('id') id: string) {

    return this.professorAlunoService.buscarPorProfessor(

      Number(id),

    );

  }

  @UseGuards(AuthGuard)

  @Get('aluno/:id')

  buscarPorAluno(@Param('id') id: string) {

    return this.professorAlunoService.buscarPorAluno(

      Number(id),

    );

  }

  @UseGuards(AuthGuard)

  @Get(':id')

  buscarPorId(@Param('id') id: string) {

    return this.professorAlunoService.buscarPorId(

      Number(id),

    );

  }

}
 