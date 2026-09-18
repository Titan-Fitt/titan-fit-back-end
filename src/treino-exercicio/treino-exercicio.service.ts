import { Injectable } from '@nestjs/common';

export interface TreinoExercicio {

  id_treino_exercicio: number;

  carga: number;

  ordem: number;

  serie: number;

  repeticoes: number;

  descanso: number;

  observacao: string;

  id_exercicio: number;

  id_treino: number;

}

@Injectable()

export class TreinoExercicioService {

  private treinoExercicios: TreinoExercicio[] = [];

  cadastrar(dados: CreateTreinoExercicioDados) {

    const novoTreinoExercicio: TreinoExercicio = {

      id_treino_exercicio: this.treinoExercicios.length + 1,

      carga: dados.carga,

      ordem: dados.ordem,

      serie: dados.serie,

      repeticoes: dados.repeticoes,

      descanso: dados.descanso,

      observacao: dados.observacao,

      id_exercicio: dados.id_exercicio,

      id_treino: dados.id_treino

    };

    this.treinoExercicios.push(novoTreinoExercicio);

    return {

      mensagem: 'Exercício adicionado ao treino com sucesso',

      treinoExercicio: novoTreinoExercicio

    };

  }

  listar() {

    return this.treinoExercicios;

  }

  buscarPorId(id: number) {

    return this.treinoExercicios.find(

      item => item.id_treino_exercicio === id

    );

  }

  buscarPorTreino(id_treino: number) {

    return this.treinoExercicios.filter(

      item => item.id_treino === id_treino

    );

  }

}

interface CreateTreinoExercicioDados {

  carga: number;

  ordem: number;

  serie: number;

  repeticoes: number;

  descanso: number;

  observacao: string;

  id_exercicio: number;

  id_treino: number;

}
 