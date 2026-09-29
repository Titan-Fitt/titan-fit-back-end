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

@Controller('professor-aluno')
export class ProfessorAlunoController {
  constructor(
    private readonly professorAlunoService: ProfessorAlunoService,
  ) {}

  // =====================================================
  // CRIAR VÍNCULO PROFESSOR + ALUNO
  // =====================================================

  @UseGuards(AuthGuard)
  @Post()
  cadastrar(
    @Body() dados: CreateProfessorAlunoDto,
    @Req() request: any,
  ) {
    return this.professorAlunoService.cadastrar(
      dados,
      request.user.id,
      request.user.tipo,
    );
  }

  // =====================================================
  // LISTAR VÍNCULOS
  // =====================================================

  @UseGuards(AuthGuard)
  @Get()
  listar(@Req() request: any) {
    return this.professorAlunoService.listar(
      request.user.id,
      request.user.tipo,
    );
  }

  // =====================================================
  // BUSCAR VÍNCULOS DE UM PROFESSOR
  // =====================================================

  @UseGuards(AuthGuard)
  @Get('professor/:id')
  buscarPorProfessor(
    @Param('id') id: string,
    @Req() request: any,
  ) {
    return this.professorAlunoService.buscarPorProfessor(
      Number(id),
      request.user.id,
      request.user.tipo,
    );
  }

  // =====================================================
  // BUSCAR PROFESSOR DE UM ALUNO
  // =====================================================

  @UseGuards(AuthGuard)
  @Get('aluno/:id')
  buscarPorAluno(
    @Param('id') id: string,
    @Req() request: any,
  ) {
    return this.professorAlunoService.buscarPorAluno(
      Number(id),
      request.user.id,
      request.user.tipo,
    );
  }

  // =====================================================
  // BUSCAR VÍNCULO POR ID
  // =====================================================

  @UseGuards(AuthGuard)
  @Get(':id')
  buscarPorId(
    @Param('id') id: string,
    @Req() request: any,
  ) {
    return this.professorAlunoService.buscarPorId(
      Number(id),
      request.user.id,
      request.user.tipo,
    );
  }
}