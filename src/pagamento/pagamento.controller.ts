import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';

import { PagamentoService } from './pagamento.service';
import { CreatePagamentoDto } from './dto/create-pagamento.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('pagamento')
export class PagamentoController {
  constructor(
    private readonly pagamentoService: PagamentoService,
  ) {}

  @UseGuards(AuthGuard)
  @Post()
  cadastrar(@Body() dados: CreatePagamentoDto) {
    return this.pagamentoService.cadastrar(dados);
  }

  @UseGuards(AuthGuard)
  @Get()
  listar() {
    return this.pagamentoService.listar();
  }

  @UseGuards(AuthGuard)
  @Get('aluno-plano/:id')
  buscarPorAlunoPlano(@Param('id') id: string) {
    return this.pagamentoService.buscarPorAlunoPlano(Number(id));
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  buscarPorId(@Param('id') id: string) {
    return this.pagamentoService.buscarPorId(Number(id));
  }
}
