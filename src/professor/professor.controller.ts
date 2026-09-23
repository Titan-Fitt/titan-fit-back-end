import {

  Body,

  Controller,

  Get,

  Param,

  Post,

  UseGuards,

} from '@nestjs/common';

import { ProfessorService } from './professor.service';

import { CreateProfessorDto } from './dto/create-professor.dto';

import { LoginProfessorDto } from './dto/login-professor.dto';

import { AuthGuard } from '../auth/auth.guard';

@Controller('professor')

export class ProfessorController {

  constructor(

    private readonly professorService: ProfessorService,

  ) {}

  @Post('cadastro')

  cadastro(@Body() dados: CreateProfessorDto) {

    return this.professorService.cadastro(dados);

  }

  @Post('login')

  login(@Body() dados: LoginProfessorDto) {

    return this.professorService.login(dados);

  }

  @UseGuards(AuthGuard)

  @Get()

  listar() {

    return this.professorService.listar();

  }

  @UseGuards(AuthGuard)

  @Get(':id')

  buscarPorId(@Param('id') id: string) {

    return this.professorService.buscarPorId(Number(id));

  }

}
 