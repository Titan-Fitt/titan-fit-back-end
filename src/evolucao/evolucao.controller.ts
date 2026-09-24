import {

  Body,

  Controller,

  Get,

  Param,

  Post,

  Req,

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

  cadastrar(

    @Body() dados: CreateEvolucaoDto,

    @Req() request: any,

  ) {

    return this.evolucaoService.cadastrar(

      dados,

      request.user.id,

      request.user.tipo,

    );

  }

  @UseGuards(AuthGuard)

  @Get()

  listar(@Req() request: any) {

    return this.evolucaoService.listar(

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

    return this.evolucaoService.buscarPorAluno(

      Number(id),

      request.user.id,

      request.user.tipo,

    );

  }

}
 