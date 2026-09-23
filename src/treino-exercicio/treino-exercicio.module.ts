import { Module } from '@nestjs/common';

import { TreinoExercicioController } from './treino-exercicio.controller';
import { TreinoExercicioService } from './treino-exercicio.service';
import { DatabaseModule } from '../database/database.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
  ],
  controllers: [TreinoExercicioController],
  providers: [TreinoExercicioService],
})
export class TreinoExercicioModule {}
