import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { PlanoService } from './plano.service';

import { CreatePlanoDto } from './dto/create-plano.dto';

@Controller('plano')

export class PlanoController {

  constructor(

    private readonly planoService: PlanoService

  ) {}

  @Post()

  cadastrar(@Body() dados: CreatePlanoDto) {

    return this.planoService.cadastrar(dados);

  }

  @Get()

  listar() {

    return this.planoService.listar();

  }

  @Get(':id')

  buscarPorId(@Param('id') id: string) {

    return this.planoService.buscarPorId(Number(id));

  }

}
 