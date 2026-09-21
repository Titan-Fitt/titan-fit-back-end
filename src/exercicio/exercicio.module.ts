import { Module } from '@nestjs/common';
import { ExercicioController } from './exercicio.controller';
import { ExercicioService } from './exercicio.service';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [ExercicioController],
  providers: [ExercicioService],
})
export class ExercicioModule {}
