import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProfessorService } from './professor.service';
import { CreateProfessorDto } from './dto/create-professor.dto';
import { LoginProfessorDto } from './dto/login-professor.dto';

@Controller('professor')
export class ProfessorController {
  constructor(private readonly professorService: ProfessorService) {}

  @Post('cadastro')
  cadastro(@Body() dados: CreateProfessorDto) {
    return this.professorService.cadastro(dados);
  }

  @Post('login')
  login(@Body() dados: LoginProfessorDto) {
    return this.professorService.login(dados);
  }

  @Get()
  listar() {
    return this.professorService.listar();
  }
}
