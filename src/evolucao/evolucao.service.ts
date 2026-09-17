import { Injectable } from '@nestjs/common';

export interface Evolucao {

  id_evolucao: number;

  id_aluno: number;

  peso: number;

  carga: number;

}

@Injectable()

export class EvolucaoService {

  private evolucoes: Evolucao[] = [];

  cadastrar(dados: CreateEvolucaoDados) {

    const novaEvolucao: Evolucao = {

      id_evolucao: this.evolucoes.length + 1,

      id_aluno: dados.id_aluno,

      peso: dados.peso,

      carga: dados.carga

    };

    this.evolucoes.push(novaEvolucao);

    return {

      mensagem: 'Evolução cadastrada com sucesso',

      evolucao: novaEvolucao

    };

  }

  listar() {

    return this.evolucoes;

  }

  buscarPorAluno(id_aluno: number) {

    return this.evolucoes.filter(

      evolucao => evolucao.id_aluno === id_aluno

    );

  }

}

interface CreateEvolucaoDados {

  id_aluno: number;

  peso: number;

  carga: number;

}
 