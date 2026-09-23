import { Module } from '@nestjs/common';

import { ExercicioController } from './exercicio.controller';
import { ExercicioService } from './exercicio.service';
import { DatabaseModule } from '../database/database.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
  ],
  controllers: [ExercicioController],
  providers: [ExercicioService],
})
export class ExercicioModule {}
