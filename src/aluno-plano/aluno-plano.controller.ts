import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';

import { AlunoPlanoService } from './aluno-plano.service';
import { CreateAlunoPlanoDto } from './dto/create-aluno-plano.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('aluno-plano')
export class AlunoPlanoController {
  constructor(
    private readonly alunoPlanoService: AlunoPlanoService,
  ) {}

  @UseGuards(AuthGuard)
  @Post()
  cadastrar(
    @Body() dados: CreateAlunoPlanoDto,
    @Req() request: any,
  ) {
    return this.alunoPlanoService.cadastrar(
      dados,
      request.user.id,
      request.user.tipo,
    );
  }

  @UseGuards(AuthGuard)
  @Get()
  listar() {
    return this.alunoPlanoService.listar();
  }

  @UseGuards(AuthGuard)
  @Get('aluno/:id')
  buscarPorAluno(@Param('id') id: string) {
    return this.alunoPlanoService.buscarPorAluno(Number(id));
  }

  @UseGuards(AuthGuard)
  @Get('plano/:id')
  buscarPorPlano(@Param('id') id: string) {
    return this.alunoPlanoService.buscarPorPlano(Number(id));
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  buscarPorId(@Param('id') id: string) {
    return this.alunoPlanoService.buscarPorId(Number(id));
  }
}
