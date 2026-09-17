import { Injectable } from '@nestjs/common';

export interface Exercicio {

  id_exercicio: number;

  nome: string;

  grupo_muscular: string;

  video: string;

}

@Injectable()

export class ExercicioService {

  private exercicios: Exercicio[] = [];

  cadastrar(dados: CreateExercicioDados) {

    const novoExercicio: Exercicio = {

      id_exercicio: this.exercicios.length + 1,

      nome: dados.nome,

      grupo_muscular: dados.grupo_muscular,

      video: dados.video

    };

    this.exercicios.push(novoExercicio);

    return {

      mensagem: 'Exercício cadastrado com sucesso',

      exercicio: novoExercicio

    };

  }

  listar() {

    return this.exercicios;

  }

  buscarPorId(id: number) {

    return this.exercicios.find(

      exercicio => exercicio.id_exercicio === id

    );

  }

}

interface CreateExercicioDados {

  nome: string;

  grupo_muscular: string;

  video: string;

}
 