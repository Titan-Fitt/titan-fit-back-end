import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { PagamentoService } from './pagamento.service';

import { CreatePagamentoDto } from './dto/create-pagamento.dto';

@Controller('pagamento')

export class PagamentoController {

  constructor(

    private readonly pagamentoService: PagamentoService

  ) {}

  @Post()

  cadastrar(@Body() dados: CreatePagamentoDto) {

    return this.pagamentoService.cadastrar(dados);

  }

  @Get()

  listar() {

    return this.pagamentoService.listar();

  }

  @Get('aluno-plano/:id')

  buscarPorAlunoPlano(@Param('id') id: string) {

    return this.pagamentoService.buscarPorAlunoPlano(Number(id));

  }

  @Get(':id')

  buscarPorId(@Param('id') id: string) {

    return this.pagamentoService.buscarPorId(Number(id));

  }

}
 