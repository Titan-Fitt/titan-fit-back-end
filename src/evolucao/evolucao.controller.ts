import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { EvolucaoService } from './evolucao.service';

import { CreateEvolucaoDto } from './dto/create-evolucao.dto';

@Controller('evolucao')

export class EvolucaoController {

  constructor(

    private readonly evolucaoService: EvolucaoService

  ) {}

  @Post()

  cadastrar(@Body() dados: CreateEvolucaoDto) {

    return this.evolucaoService.cadastrar(dados);

  }

  @Get()

  listar() {

    return this.evolucaoService.listar();

  }

  @Get('aluno/:id')

  buscarPorAluno(@Param('id') id: string) {

    return this.evolucaoService.buscarPorAluno(

      Number(id)

    );

  }

}
 