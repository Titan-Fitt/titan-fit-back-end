import { Module } from '@nestjs/common';
import { TreinoExercicioController } from './treino-exercicio.controller';
import { TreinoExercicioService } from './treino-exercicio.service';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [TreinoExercicioController],
  providers: [TreinoExercicioService],
})
export class TreinoExercicioModule {}
