import { Module } from '@nestjs/common';
import { AlunoModule } from './aluno/aluno.module';
import { ProfessorModule } from './professor/professor.module';
import { FichaAlunoModule } from './ficha-aluno/ficha-aluno.module';
import { EvolucaoModule } from './evolucao/evolucao.module';
import { ExercicioModule } from './exercicio/exercicio.module';
import { TreinoModule } from './treino/treino.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    AlunoModule,
    ProfessorModule,
    FichaAlunoModule,
    EvolucaoModule,
    ExercicioModule,
    TreinoModule,
    DatabaseModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
