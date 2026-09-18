import { Module } from '@nestjs/common';
import { TreinoExercicioController } from './treino-exercicio.controller';
import { TreinoExercicioService } from './treino-exercicio.service';

@Module({
  controllers: [TreinoExercicioController],
  providers: [TreinoExercicioService],
})
export class TreinoExercicioModule {}
