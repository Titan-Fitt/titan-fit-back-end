import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { TreinoExercicioService } from './treino-exercicio.service';import { CreateTreinoExercicioDto } from './dto/create-treino-exercicio.dto';import { AuthGuard } from '../auth/auth.guard';import { ProfessorGuard } from '../auth/professor.guard';
@Controller('treino-exercicio')export class TreinoExercicioController {
  constructor(
    private readonly treinoExercicioService: TreinoExercicioService,
  ) {}

  @UseGuards(ProfessorGuard)
  @Post()
  cadastrar(
    @Body() dados: CreateTreinoExercicioDto,
    @Req() request: any,
  ) {
    return this.treinoExercicioService.cadastrar(
      dados,
      request.user.id,
    );
  }

  @UseGuards(AuthGuard)
  @Get()
  listar(@Req() request: any) {
    return this.treinoExercicioService.listar(
      request.user.id,
      request.user.tipo,
    );
  }

  @UseGuards(AuthGuard)
  @Get('treino/:id')
  buscarPorTreino(
    @Param('id') id: string,
    @Req() request: any,
  ) {
    return this.treinoExercicioService.buscarPorTreino(
      Number(id),
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
    return this.treinoExercicioService.buscarPorId(
      Number(id),
      request.user.id,
      request.user.tipo,
    );
  }
}
