import { Module } from '@nestjs/common';
import { AlunoModule } from './aluno/aluno.module';
import { ProfessorModule } from './professor/professor.module';

@Module({
  imports: [AlunoModule, ProfessorModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
