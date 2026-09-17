import { Injectable } from '@nestjs/common';

export interface Treino {

  id_treino: number;

  nome_treino: string;

  tipo_treino: string;

  objetivo: string;

  id_ficha: number;

  id_professor: number;

  data_criacao: Date;

}

@Injectable()

export class TreinoService {

  private treinos: Treino[] = [];

  cadastrar(dados: CreateTreinoDados) {

    const novoTreino: Treino = {

      id_treino: this.treinos.length + 1,

      nome_treino: dados.nome_treino,

      tipo_treino: dados.tipo_treino,

      objetivo: dados.objetivo,

      id_ficha: dados.id_ficha,

      id_professor: dados.id_professor,

      data_criacao: new Date()

    };

    this.treinos.push(novoTreino);

    return {

      mensagem: 'Treino cadastrado com sucesso',

      treino: novoTreino

    };

  }

  listar() {

    return this.treinos;

  }

  buscarPorId(id: number) {

    return this.treinos.find(

      treino => treino.id_treino === id

    );

  }

  buscarPorFicha(id_ficha: number) {

    return this.treinos.filter(

      treino => treino.id_ficha === id_ficha

    );

  }

  buscarPorProfessor(id_professor: number) {

    return this.treinos.filter(

      treino => treino.id_professor === id_professor

    );

  }

}

interface CreateTreinoDados {

  nome_treino: string;

  tipo_treino: string;

  objetivo: string;

  id_ficha: number;

  id_professor: number;

}
 