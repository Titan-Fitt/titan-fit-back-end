import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { ExercicioService } from './exercicio.service';

import { CreateExercicioDto } from './dto/create-exercicio.dto';

@Controller('exercicio')

export class ExercicioController {

  constructor(

    private readonly exercicioService: ExercicioService

  ) {}

  @Post()

  cadastrar(@Body() dados: CreateExercicioDto) {

    return this.exercicioService.cadastrar(dados);

  }

  @Get()

  listar() {

    return this.exercicioService.listar();

  }

  @Get(':id')

  buscarPorId(@Param('id') id: string) {

    return this.exercicioService.buscarPorId(Number(id));

  }

}
 