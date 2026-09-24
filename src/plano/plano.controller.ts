import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { PlanoService } from './plano.service';import { CreatePlanoDto } from './dto/create-plano.dto';import { AuthGuard } from '../auth/auth.guard';import { ProfessorGuard } from '../auth/professor.guard';
@Controller('plano')export class PlanoController {
  constructor(
    private readonly planoService: PlanoService,
  ) {}

  @UseGuards(ProfessorGuard)
  @Post()
  cadastrar(@Body() dados: CreatePlanoDto) {
    return this.planoService.cadastrar(dados);
  }

  @UseGuards(AuthGuard)
  @Get()
  listar() {
    return this.planoService.listar();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  buscarPorId(@Param('id') id: string) {
    return this.planoService.buscarPorId(Number(id));
  }
}
