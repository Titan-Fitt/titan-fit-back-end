import {

  Body,

  Controller,

  Get,

  Param,

  Post,

  Put,

  UseGuards,

} from '@nestjs/common';

import { FichaAlunoService } from './ficha-aluno.service';

import { CreateFichaAlunoDto } from './dto/create-ficha-aluno.dto';

import { AuthGuard } from '../auth/auth.guard';

@Controller('ficha-aluno')

export class FichaAlunoController {

  constructor(

    private readonly fichaAlunoService: FichaAlunoService,

  ) {}

  @UseGuards(AuthGuard)

  @Post()

  cadastrar(@Body() dados: CreateFichaAlunoDto) {

    return this.fichaAlunoService.cadastrar(dados);

  }

  @UseGuards(AuthGuard)

  @Get()

  listar() {

    return this.fichaAlunoService.listar();

  }

  @UseGuards(AuthGuard)

  @Get('aluno/:id')

  buscarPorAluno(@Param('id') id: string) {

    return this.fichaAlunoService.buscarPorAluno(

      Number(id),

    );

  }

  @UseGuards(AuthGuard)

  @Put('aluno/:id')

  atualizar(

    @Param('id') id: string,

    @Body() dados: CreateFichaAlunoDto,

  ) {

    return this.fichaAlunoService.atualizar(

      Number(id),

      dados,

    );

  }

}
 