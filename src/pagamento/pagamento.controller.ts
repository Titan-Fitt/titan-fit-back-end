import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { PagamentoService } from './pagamento.service';import { CreatePagamentoDto } from './dto/create-pagamento.dto';import { AuthGuard } from '../auth/auth.guard';
@Controller('pagamento')export class PagamentoController {
  constructor(
    private readonly pagamentoService: PagamentoService,
  ) {}

  @UseGuards(AuthGuard)
  @Post()
  cadastrar(
    @Body() dados: CreatePagamentoDto,
    @Req() request: any,
  ) {
    return this.pagamentoService.cadastrar(
      dados,
      request.user.id,
      request.user.tipo,
    );
  }

  @UseGuards(AuthGuard)
  @Get()
  listar(@Req() request: any) {
    return this.pagamentoService.listar(
      request.user.id,
      request.user.tipo,
    );
  }

  @UseGuards(AuthGuard)
  @Get('aluno-plano/:id')
  buscarPorAlunoPlano(
    @Param('id') id: string,
    @Req() request: any,
  ) {
    return this.pagamentoService.buscarPorAlunoPlano(
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
    return this.pagamentoService.buscarPorId(
      Number(id),
      request.user.id,
      request.user.tipo,
    );
  }
}
