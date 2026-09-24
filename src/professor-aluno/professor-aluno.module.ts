import { Module } from '@nestjs/common';

import { ProfessorAlunoController } from './professor-aluno.controller';
import { ProfessorAlunoService } from './professor-aluno.service';
import { DatabaseModule } from '../database/database.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
  ],
  controllers: [ProfessorAlunoController],
  providers: [ProfessorAlunoService],
})
export class ProfessorAlunoModule {}
