import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { TreinoService } from './treino.service';import { CreateTreinoDto } from './dto/create-treino.dto';import { AuthGuard } from '../auth/auth.guard';import { ProfessorGuard } from '../auth/professor.guard';
@Controller('treino')export class TreinoController {
  constructor(
    private readonly treinoService: TreinoService,
  ) {}

  @UseGuards(ProfessorGuard)
  @Post()
  cadastrar(
    @Body() dados: CreateTreinoDto,
    @Req() request: any,
  ) {
    return this.treinoService.cadastrar(
      dados,
      request.user.id,
    );
  }

  @UseGuards(AuthGuard)
  @Get()
  listar(@Req() request: any) {
    return this.treinoService.listar(
      request.user.id,
      request.user.tipo,
    );
  }

  @UseGuards(AuthGuard)
  @Get('ficha/:id')
  buscarPorFicha(
    @Param('id') id: string,
    @Req() request: any,
  ) {
    return this.treinoService.buscarPorFicha(
      Number(id),
      request.user.id,
      request.user.tipo,
    );
  }

  @UseGuards(AuthGuard)
  @Get('professor/:id')
  buscarPorProfessor(
    @Param('id') id: string,
    @Req() request: any,
  ) {
    return this.treinoService.buscarPorProfessor(
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
    return this.treinoService.buscarPorId(
      Number(id),
      request.user.id,
      request.user.tipo,
    );
  }
}
