import { Module } from '@nestjs/common';

import { ProfessorController } from './professor.controller';
import { ProfessorService } from './professor.service';
import { DatabaseModule } from '../database/database.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
  ],
  controllers: [ProfessorController],
  providers: [ProfessorService],
})
export class ProfessorModule {}
