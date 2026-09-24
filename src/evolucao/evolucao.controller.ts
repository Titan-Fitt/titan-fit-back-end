import {

  Body,

  Controller,

  Get,

  Param,

  Post,

  UseGuards,

} from '@nestjs/common';

import { EvolucaoService } from './evolucao.service';

import { CreateEvolucaoDto } from './dto/create-evolucao.dto';

import { AuthGuard } from '../auth/auth.guard';

@Controller('evolucao')

export class EvolucaoController {

  constructor(

    private readonly evolucaoService: EvolucaoService,

  ) {}

  @UseGuards(AuthGuard)

  @Post()

  cadastrar(@Body() dados: CreateEvolucaoDto) {

    return this.evolucaoService.cadastrar(dados);

  }

  @UseGuards(AuthGuard)

  @Get()

  listar() {

    return this.evolucaoService.listar();

  }

  @UseGuards(AuthGuard)

  @Get('aluno/:id')

  buscarPorAluno(@Param('id') id: string) {

    return this.evolucaoService.buscarPorAluno(

      Number(id),

    );

  }

}
 