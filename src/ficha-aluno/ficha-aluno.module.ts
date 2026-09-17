import { Module } from '@nestjs/common';
import { FichaAlunoController } from './ficha-aluno.controller';
import { FichaAlunoService } from './ficha-aluno.service';

@Module({
  controllers: [FichaAlunoController],
  providers: [FichaAlunoService],
})
export class FichaAlunoModule {}
