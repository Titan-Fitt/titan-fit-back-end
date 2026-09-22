import { Module } from '@nestjs/common';
import { EvolucaoController } from './evolucao.controller';
import { EvolucaoService } from './evolucao.service';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [EvolucaoController],
  providers: [EvolucaoService],
})
export class EvolucaoModule {}
