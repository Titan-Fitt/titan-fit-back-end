import {

  Body,

  Controller,

  Get,

  Param,

  Post

} from '@nestjs/common';

import { TreinoService } from './treino.service';

import { CreateTreinoDto } from './dto/create-treino.dto';

@Controller('treino')

export class TreinoController {

  constructor(

    private readonly treinoService: TreinoService

  ) {}

  @Post()

  cadastrar(@Body() dados: CreateTreinoDto) {

    return this.treinoService.cadastrar(dados);

  }

  @Get()

  listar() {

    return this.treinoService.listar();

  }

  @Get('ficha/:id')

  buscarPorFicha(@Param('id') id: string) {

    return this.treinoService.buscarPorFicha(

      Number(id)

    );

  }

  @Get('professor/:id')

  buscarPorProfessor(@Param('id') id: string) {

    return this.treinoService.buscarPorProfessor(

      Number(id)

    );

  }

  @Get(':id')

  buscarPorId(@Param('id') id: string) {

    return this.treinoService.buscarPorId(

      Number(id)

    );

  }

}
 