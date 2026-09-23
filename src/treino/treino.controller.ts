import {

  Body,

  Controller,

  Get,

  Param,

  Post,

  UseGuards,

} from '@nestjs/common';

import { TreinoService } from './treino.service';

import { CreateTreinoDto } from './dto/create-treino.dto';

import { AuthGuard } from '../auth/auth.guard';

import { ProfessorGuard } from '../auth/professor.guard';

@Controller('treino')

export class TreinoController {

  constructor(

    private readonly treinoService: TreinoService,

  ) {}

  @UseGuards(ProfessorGuard)

  @Post()

  cadastrar(@Body() dados: CreateTreinoDto) {

    return this.treinoService.cadastrar(dados);

  }

  @UseGuards(AuthGuard)

  @Get()

  listar() {

    return this.treinoService.listar();

  }

  @UseGuards(AuthGuard)

  @Get('ficha/:id')

  buscarPorFicha(@Param('id') id: string) {

    return this.treinoService.buscarPorFicha(Number(id));

  }

  @UseGuards(AuthGuard)

  @Get('professor/:id')

  buscarPorProfessor(@Param('id') id: string) {

    return this.treinoService.buscarPorProfessor(Number(id));

  }

  @UseGuards(AuthGuard)

  @Get(':id')

  buscarPorId(@Param('id') id: string) {

    return this.treinoService.buscarPorId(Number(id));

  }

}
 