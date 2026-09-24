import { Module } from '@nestjs/common';

import { AlunoPlanoController } from './aluno-plano.controller';
import { AlunoPlanoService } from './aluno-plano.service';
import { DatabaseModule } from '../database/database.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
  ],
  controllers: [AlunoPlanoController],
  providers: [AlunoPlanoService],
})
export class AlunoPlanoModule {}
