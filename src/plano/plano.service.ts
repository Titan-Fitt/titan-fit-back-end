import { Injectable } from '@nestjs/common';

export interface Plano {

  id_plano: number;

  nome: string;

  descricao: string;

  valor: number;

  tipo_plano: string;

}

@Injectable()

export class PlanoService {

  private planos: Plano[] = [];

  cadastrar(dados: CreatePlanoDados) {

    const planoExiste = this.planos.find(

      plano => plano.nome === dados.nome

    );

    if (planoExiste) {

      return {

        mensagem: 'Esse plano já está cadastrado'

      };

    }

    const novoPlano: Plano = {

      id_plano: this.planos.length + 1,

      nome: dados.nome,

      descricao: dados.descricao,

      valor: dados.valor,

      tipo_plano: dados.tipo_plano

    };

    this.planos.push(novoPlano);

    return {

      mensagem: 'Plano cadastrado com sucesso',

      plano: novoPlano

    };

  }

  listar() {

    return this.planos;

  }

  buscarPorId(id: number) {

    return this.planos.find(

      plano => plano.id_plano === id

    );

  }

}

interface CreatePlanoDados {

  nome: string;

  descricao: string;

  valor: number;

  tipo_plano: string;

}
 