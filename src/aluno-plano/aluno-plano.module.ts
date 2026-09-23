import { Module } from '@nestjs/common';
import { AlunoPlanoController } from './aluno-plano.controller';
import { AlunoPlanoService } from './aluno-plano.service';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [AlunoPlanoController],
  providers: [AlunoPlanoService],
})
export class AlunoPlanoModule {}
