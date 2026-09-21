import { Injectable } from '@nestjs/common';

import * as bcrypt from 'bcrypt';

import { DatabaseService } from '../database/database.service';

@Injectable()

export class AlunoService {

  constructor(

    private readonly databaseService: DatabaseService

  ) {}

  async cadastro(dados: any) {

    const pool = this.databaseService.getPool();

    const [alunoExiste]: any = await pool.query(

      'SELECT id_aluno FROM aluno WHERE email = ? OR cpf = ?',

      [dados.email, dados.cpf]

    );

    if (alunoExiste.length > 0) {

      return {

        mensagem: 'E-mail ou CPF já cadastrado'

      };

    }

    const senhaCriptografada = await bcrypt.hash(

      dados.senha,

      10

    );

    const [resultado]: any = await pool.query(

      `INSERT INTO aluno

      (nome, email, senha, cpf)

      VALUES (?, ?, ?, ?)`,

      [

        dados.nome,

        dados.email,

        senhaCriptografada,

        dados.cpf

      ]

    );

    return {

      mensagem: 'Aluno cadastrado com sucesso',

      aluno: {

        id: resultado.insertId,

        nome: dados.nome,

        email: dados.email,

        cpf: dados.cpf

      }

    };

  }

  async login(dados: any) {

    const pool = this.databaseService.getPool();

    const [alunos]: any = await pool.query(

      'SELECT * FROM aluno WHERE email = ?',

      [dados.email]

    );

    if (alunos.length === 0) {

      return {

        mensagem: 'E-mail ou senha incorretos'

      };

    }

    const aluno = alunos[0];

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

        id: aluno.id_aluno,

        nome: aluno.nome,

        email: aluno.email,

        cpf: aluno.cpf,

        data_cadastro: aluno.data_cadastro

      }

    };

  }

  async listar() {

    const pool = this.databaseService.getPool();

    const [alunos]: any = await pool.query(

      `SELECT

        id_aluno,

        nome,

        email,

        cpf,

        data_cadastro

       FROM aluno`

    );

    return alunos;

  }

  async buscarPorId(id: number) {

    const pool = this.databaseService.getPool();

    const [alunos]: any = await pool.query(

      `SELECT

        id_aluno,

        nome,

        email,

        cpf,

        data_cadastro

       FROM aluno

       WHERE id_aluno = ?`,

      [id]

    );

    if (alunos.length === 0) {

      return {

        mensagem: 'Aluno não encontrado'

      };

    }

    return alunos[0];

  }

}
 