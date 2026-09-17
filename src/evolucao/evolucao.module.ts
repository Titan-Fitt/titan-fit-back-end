import { Module } from '@nestjs/common';
import { EvolucaoController } from './evolucao.controller';
import { EvolucaoService } from './evolucao.service';

@Module({
  controllers: [EvolucaoController],
  providers: [EvolucaoService]
})
export class EvolucaoModule {}
