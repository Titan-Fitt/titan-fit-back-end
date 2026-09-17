import { Injectable } from '@nestjs/common';

export interface FichaAluno {
  id_ficha: number;
  idade: number;
  peso: number;
  altura: number;
  objetivo: string;
  id_aluno: number;
  data_atualizacao: Date;
}

@Injectable()
export class FichaAlunoService {
  private fichas: FichaAluno[] = [];
  cadastrar(dados: any) {
    const fichaExiste = this.fichas.find(
      ficha => ficha.id_aluno === dados.id_aluno
    );

    if (fichaExiste) {
      return {
        mensagem: 'Esse aluno já possui uma ficha'

      };

    }

    const objetivos = [

      'Funcional',

      'Hipertrofia',

      'Força máxima',

      'Resistência muscular'

    ];

    if (!objetivos.includes(dados.objetivo)) {

      return {

        mensagem: 'Objetivo inválido'

      };

    }

    const novaFicha: FichaAluno = {

      id_ficha: this.fichas.length + 1,

      idade: dados.idade,

      peso: dados.peso,

      altura: dados.altura,

      objetivo: dados.objetivo,

      id_aluno: dados.id_aluno,

      data_atualizacao: new Date()

    };

    this.fichas.push(novaFicha);

    return {

      mensagem: 'Ficha cadastrada com sucesso',

      ficha: novaFicha

    };

  }

  listar() {

    return this.fichas;

  }

  buscarPorAluno(id_aluno: number) {

    return this.fichas.find(

      ficha => ficha.id_aluno === id_aluno

    );

  }

  atualizar(id_aluno: number, dados: any) {

    const ficha = this.fichas.find(

      ficha => ficha.id_aluno === id_aluno

    );

    if (!ficha) {

      return {

        mensagem: 'Ficha não encontrada'

      };

    }

    ficha.idade = dados.idade;

    ficha.peso = dados.peso;

    ficha.altura = dados.altura;

    ficha.objetivo = dados.objetivo;

    ficha.data_atualizacao = new Date();

    return {

      mensagem: 'Ficha atualizada com sucesso',

      ficha

    };

  }

}
