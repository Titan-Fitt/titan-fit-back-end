import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { TreinoExercicioService } from './treino-exercicio.service';
import { CreateTreinoExercicioDto } from './dto/create-treino-exercicio.dto';
import { AuthGuard } from '../auth/auth.guard';
import { ProfessorGuard } from '../auth/professor.guard';
@Controller('treino-exercicio')
export class TreinoExercicioController {
  constructor(
    private readonly treinoExercicioService: TreinoExercicioService,
  ) {}
  @UseGuards(ProfessorGuard)
  @Post()
  cadastrar(@Body() dados: CreateTreinoExercicioDto) {
    return this.treinoExercicioService.cadastrar(dados);
  }
  @UseGuards(AuthGuard)
  @Get()
  listar() {
    return this.treinoExercicioService.listar();
  }
  @UseGuards(AuthGuard)
  @Get('treino/:id')
  buscarPorTreino(@Param('id') id: string) {
    return this.treinoExercicioService.buscarPorTreino(Number(id));
  }
  @UseGuards(AuthGuard)
  @Get(':id')
  buscarPorId(@Param('id') id: string) {
    return this.treinoExercicioService.buscarPorId(Number(id));
  }
}
