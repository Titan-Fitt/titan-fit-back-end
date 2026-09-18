import { Module } from '@nestjs/common';
import { AlunoPlanoController } from './aluno-plano.controller';
import { AlunoPlanoService } from './aluno-plano.service';

@Module({
  controllers: [AlunoPlanoController],
  providers: [AlunoPlanoService]
})
export class AlunoPlanoModule {}
