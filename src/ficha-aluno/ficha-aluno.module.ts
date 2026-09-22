import { Module } from '@nestjs/common';
import { FichaAlunoController } from './ficha-aluno.controller';
import { FichaAlunoService } from './ficha-aluno.service';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [FichaAlunoController],
  providers: [FichaAlunoService],
})
export class FichaAlunoModule {}
