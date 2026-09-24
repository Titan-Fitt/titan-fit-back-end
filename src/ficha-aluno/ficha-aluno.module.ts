import { Module } from '@nestjs/common';

import { FichaAlunoController } from './ficha-aluno.controller';

import { FichaAlunoService } from './ficha-aluno.service';

import { DatabaseModule } from '../database/database.module';

import { AuthModule } from '../auth/auth.module';

@Module({

  imports: [

    DatabaseModule,

    AuthModule,

  ],

  controllers: [FichaAlunoController],

  providers: [FichaAlunoService],

})

export class FichaAlunoModule {}
 