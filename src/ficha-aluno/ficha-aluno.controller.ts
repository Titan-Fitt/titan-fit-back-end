import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { FichaAlunoService } from './ficha-aluno.service';import { CreateFichaAlunoDto } from './dto/create-ficha-aluno.dto';import { AuthGuard } from '../auth/auth.guard';
@Controller('ficha-aluno')export class FichaAlunoController {
  constructor(
    private readonly fichaAlunoService: FichaAlunoService,
  ) {}

  @UseGuards(AuthGuard)
  @Post()
  cadastrar(
    @Body() dados: CreateFichaAlunoDto,
    @Req() request: any,
  ) {
    return this.fichaAlunoService.cadastrar(
      dados,
      request.user.id,
      request.user.tipo,
    );
  }

  @UseGuards(AuthGuard)
  @Get()
  listar(@Req() request: any) {
    return this.fichaAlunoService.listar(
      request.user.id,
      request.user.tipo,
    );
  }

  @UseGuards(AuthGuard)
  @Get('aluno/:id')
  buscarPorAluno(
    @Param('id') id: string,
    @Req() request: any,
  ) {
    return this.fichaAlunoService.buscarPorAluno(
      Number(id),
      request.user.id,
      request.user.tipo,
    );
  }

  @UseGuards(AuthGuard)
  @Put('aluno/:id')
  atualizar(
    @Param('id') id: string,
    @Body() dados: CreateFichaAlunoDto,
    @Req() request: any,
  ) {
    return this.fichaAlunoService.atualizar(
      Number(id),
      dados,
      request.user.id,
      request.user.tipo,
    );
  }
}
