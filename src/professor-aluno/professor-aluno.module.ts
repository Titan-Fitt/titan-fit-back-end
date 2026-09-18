import { Module } from '@nestjs/common';
import { ProfessorAlunoController } from './professor-aluno.controller';
import { ProfessorAlunoService } from './professor-aluno.service';

@Module({
  controllers: [ProfessorAlunoController],
  providers: [ProfessorAlunoService]
})
export class ProfessorAlunoModule {}
