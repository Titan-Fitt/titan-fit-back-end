import { Module } from '@nestjs/common';
import { ProfessorAlunoController } from './professor-aluno.controller';
import { ProfessorAlunoService } from './professor-aluno.service';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [ProfessorAlunoController],
  providers: [ProfessorAlunoService],
})
export class ProfessorAlunoModule {}
