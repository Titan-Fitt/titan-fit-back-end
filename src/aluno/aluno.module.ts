import { Module } from '@nestjs/common';

import { AlunoController } from './aluno.controller';

import { AlunoService } from './aluno.service';

import { DatabaseModule } from '../database/database.module';

import { AuthModule } from '../auth/auth.module';

@Module({

  imports: [

    DatabaseModule,

    AuthModule,

  ],

  controllers: [AlunoController],

  providers: [AlunoService],

})

export class AlunoModule {}
 