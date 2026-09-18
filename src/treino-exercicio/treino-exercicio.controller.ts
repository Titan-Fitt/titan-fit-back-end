import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { TreinoExercicioService } from './treino-exercicio.service';

import { CreateTreinoExercicioDto } from './dto/create-treino-exercicio.dto';

@Controller('treino-exercicio')

export class TreinoExercicioController {

  constructor(

    private readonly treinoExercicioService: TreinoExercicioService

  ) {}

  @Post()

  cadastrar(@Body() dados: CreateTreinoExercicioDto) {

    return this.treinoExercicioService.cadastrar(dados);

  }

  @Get()

  listar() {

    return this.treinoExercicioService.listar();

  }

  @Get('treino/:id')

  buscarPorTreino(@Param('id') id: string) {

    return this.treinoExercicioService.buscarPorTreino(Number(id));

  }

  @Get(':id')

  buscarPorId(@Param('id') id: string) {

    return this.treinoExercicioService.buscarPorId(Number(id));

  }

}
