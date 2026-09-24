import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';import { ExercicioService } from './exercicio.service';
import { CreateExercicioDto } from './dto/create-exercicio.dto';
import { AuthGuard } from '../auth/auth.guard';
import { ProfessorGuard } from '../auth/professor.guard';
@Controller('exercicio')export class ExercicioController {
  constructor(private readonly exercicioService: ExercicioService) {}

  @UseGuards(ProfessorGuard)
  @Post()
  cadastrar(@Body() dados: CreateExercicioDto) {
    return this.exercicioService.cadastrar(dados);
  }

  @UseGuards(AuthGuard)
  @Get()
  listar() {
    return this.exercicioService.listar();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  buscarPorId(@Param('id') id: string) {
    return this.exercicioService.buscarPorId(Number(id));
  }
}
