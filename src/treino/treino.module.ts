import { Module } from '@nestjs/common';

import { TreinoController } from './treino.controller';
import { TreinoService } from './treino.service';

import { DatabaseModule } from '../database/database.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
  ],

  controllers: [TreinoController],

  providers: [TreinoService],
})
export class TreinoModule {}
