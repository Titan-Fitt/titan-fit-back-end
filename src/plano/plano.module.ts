import { Module } from '@nestjs/common';

import { PlanoController } from './plano.controller';
import { PlanoService } from './plano.service';
import { DatabaseModule } from '../database/database.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
  ],
  controllers: [PlanoController],
  providers: [PlanoService],
})
export class PlanoModule {}
