import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';

import { ProfessorService } from './professor.service';
import { CreateProfessorDto } from './dto/create-professor.dto';
import { LoginProfessorDto } from './dto/login-professor.dto';
import { AuthGuard } from '../auth/auth.guard';
import { AuthService } from '../auth/auth.service';

@Controller('professor')
export class ProfessorController {
  constructor(
    private readonly professorService: ProfessorService,
    private readonly authService: AuthService,
  ) {}

  @Post('cadastro')
  cadastro(@Body() dados: CreateProfessorDto) {
    return this.professorService.cadastro(dados);
  }

  @Post('login')
  login(@Body() dados: LoginProfessorDto) {
    return this.authService.loginProfessor(
      dados.email,
      dados.senha,
    );
  }

  @UseGuards(AuthGuard)
  @Get()
  listar(@Req() request: any) {
    return this.professorService.listar(
      request.user.id,
      request.user.tipo,
    );
  }

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
}