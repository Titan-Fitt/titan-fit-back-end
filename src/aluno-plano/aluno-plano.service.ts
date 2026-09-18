import { Injectable } from '@nestjs/common';

export interface AlunoPlano {

  id_aluno_plano: number;

  id_aluno: number;

  id_plano: number;

  data_inicio: string;

  data_fim: string;

  status: string;

}

@Injectable()

export class AlunoPlanoService {

  private alunoPlanos: AlunoPlano[] = [];

  cadastrar(dados: CreateAlunoPlanoDados) {

    const planoAtivo = this.alunoPlanos.find(

      item =>

        item.id_aluno === dados.id_aluno &&

        item.status === 'Ativo'

    );

    if (planoAtivo) {

      return {

        mensagem: 'Esse aluno já possui um plano ativo'

      };

    }

    const novoAlunoPlano: AlunoPlano = {

      id_aluno_plano: this.alunoPlanos.length + 1,

      id_aluno: dados.id_aluno,

      id_plano: dados.id_plano,

      data_inicio: dados.data_inicio,

      data_fim: dados.data_fim,

      status: dados.status

    };

    this.alunoPlanos.push(novoAlunoPlano);

    return {

      mensagem: 'Plano vinculado ao aluno com sucesso',

      alunoPlano: novoAlunoPlano

    };

  }

  listar() {

    return this.alunoPlanos;

  }

  buscarPorId(id: number) {

    return this.alunoPlanos.find(

      item => item.id_aluno_plano === id

    );

  }

  buscarPorAluno(id_aluno: number) {

    return this.alunoPlanos.filter(

      item => item.id_aluno === id_aluno

    );

  }

  buscarPorPlano(id_plano: number) {

    return this.alunoPlanos.filter(

      item => item.id_plano === id_plano

    );

  }

}

interface CreateAlunoPlanoDados {

  id_aluno: number;

  id_plano: number;

  data_inicio: string;

  data_fim: string;

  status: string;

}
 