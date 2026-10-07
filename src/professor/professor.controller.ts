
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';

import { ProfessorService } from './professor.service';
import { CreateProfessorDto } from './dto/create-professor.dto';
import { LoginProfessorDto } from './dto/login-professor.dto';
import { AuthGuard } from '../auth/auth.guard';
import { ProfessorGuard } from '../auth/professor.guard';
import { AuthService } from '../auth/auth.service';

@Controller('professor')
export class ProfessorController {

  constructor(
    private readonly professorService: ProfessorService,
    private readonly authService: AuthService,
  ) {}

  // =====================================================
  // CADASTRO
  // =====================================================

  @Post('cadastro')
  cadastro(@Body() dados: CreateProfessorDto) {
    return this.professorService.cadastro(dados);
  }

  // =====================================================
  // LOGIN
  // =====================================================

  @Post('login')
  login(@Body() dados: LoginProfessorDto) {
    return this.authService.loginProfessor(
      dados.email,
      dados.senha,
    );
  }

  // =====================================================
  // LISTAR PROFESSORES
  // =====================================================

  @UseGuards(AuthGuard)
  @Get()
  listar(@Req() request: any) {
    return this.professorService.listar(
      request.user.id,
      request.user.tipo,
    );
  }

  // =====================================================
  // BUSCAR PROFESSOR POR ID
  // =====================================================

  @UseGuards(AuthGuard)
  @Get(':id')
  buscarPorId(
    @Param('id') id: string,
    @Req() request: any,
  ) {
    return this.professorService.buscarPorId(
      Number(id),
      request.user.id,
      request.user.tipo,
    );
  }

  // =====================================================
  // ATUALIZAR PERFIL DO PROFESSOR
  // =====================================================

  @UseGuards(AuthGuard, ProfessorGuard)
  @Put(':id')
  atualizar(
    @Param('id') id: string,
    @Req() request: any,
    @Body() dados: any,
  ) {
    return this.professorService.atualizar(
      Number(id),
      request.user.id,
      request.user.tipo,
      dados,
    );
  }
}

