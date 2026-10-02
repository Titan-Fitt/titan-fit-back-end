import { Module } from '@nestjs/common';

import { ProfessorController } from './professor.controller';
import { ProfessorService } from './professor.service';

import { AuthModule } from '../auth/auth.module';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [
    AuthModule,
    DatabaseModule,
  ],

  controllers: [
    ProfessorController,
  ],

  providers: [
    ProfessorService,
  ],
})
export class ProfessorModule {}