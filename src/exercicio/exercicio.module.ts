import { Module } from '@nestjs/common';
import { ExercicioController } from './exercicio.controller';
import { ExercicioService } from './exercicio.service';

@Module({
  controllers: [ExercicioController],
  providers: [ExercicioService]
})
export class ExercicioModule {}
