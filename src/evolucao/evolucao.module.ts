import { Module } from '@nestjs/common';

import { EvolucaoController } from './evolucao.controller';
import { EvolucaoService } from './evolucao.service';
import { DatabaseModule } from '../database/database.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
  ],
  controllers: [EvolucaoController],
  providers: [EvolucaoService],
})
export class EvolucaoModule {}
