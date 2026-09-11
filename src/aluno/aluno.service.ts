import { Injectable } from '@nestjs/common';

import * as bcrypt from 'bcrypt';

interface Aluno {

  id: number;

  nome: string;

  email: string;

  senha: string;

  telefone: string;

  cpf: string;

}

@Injectable()

export class AlunoService {

  private alunos: Aluno[] = [];

  async cadastro(dados: any) {

    const alunoExiste = this.alunos.find(

      aluno => aluno.email === dados.email

    );

    if (alunoExiste) {

      return {

        mensagem: 'E-mail já cadastrado'

      };

    }

    const senhaCriptografada = await bcrypt.hash(dados.senha, 10);

    const novoAluno: Aluno = {

      id: this.alunos.length + 1,

      nome: dados.nome,

      email: dados.email,

      senha: senhaCriptografada,

      telefone: dados.telefone,

      cpf: dados.cpf

    };

    this.alunos.push(novoAluno);

    return {

      mensagem: 'Aluno cadastrado com sucesso',

      aluno: {

        id: novoAluno.id,

        nome: novoAluno.nome,

        email: novoAluno.email,

        telefone: novoAluno.telefone,

        cpf: novoAluno.cpf

      }

    };

  }

  async login(dados: any) {

    const aluno = this.alunos.find(

      aluno => aluno.email === dados.email

    );

    if (!aluno) {

      return {

        mensagem: 'E-mail ou senha incorretos'

      };

    }

    const senhaCorreta = await bcrypt.compare(

      dados.senha,

      aluno.senha

    );

    if (!senhaCorreta) {

      return {

        mensagem: 'E-mail ou senha incorretos'

      };

    }

    return {

      mensagem: 'Login realizado com sucesso',

      aluno: {

        id: aluno.id,

        nome: aluno.nome,

        email: aluno.email,

        telefone: aluno.telefone,

        cpf: aluno.cpf

      }

    };

  }

  listar() {

    return this.alunos.map(aluno => ({

      id: aluno.id,

      nome: aluno.nome,

      email: aluno.email,

      telefone: aluno.telefone,

      cpf: aluno.cpf

    }));

  }

}
 