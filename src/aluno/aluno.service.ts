import { Injectable } from '@nestjs/common';

import * as bcrypt from 'bcrypt';

import { DatabaseService } from '../database/database.service';

@Injectable()

export class AlunoService {

  constructor(

    private readonly databaseService: DatabaseService,

  ) {}

  async cadastro(dados: any) {

    const pool = this.databaseService.getPool();

    const [alunoExiste]: any = await pool.query(

      'SELECT id_aluno FROM aluno WHERE email = ? OR cpf = ?',

      [dados.email, dados.cpf],

    );

    if (alunoExiste.length > 0) {

      return {

        mensagem: 'E-mail ou CPF já cadastrado',

      };

    }

    const senhaCriptografada = await bcrypt.hash(

      dados.senha,

      10,

    );

    const [resultado]: any = await pool.query(

      `INSERT INTO aluno

       (nome, email, senha, cpf)

       VALUES (?, ?, ?, ?)`,

      [

        dados.nome,

        dados.email,

        senhaCriptografada,

        dados.cpf,

      ],

    );

    return {

      mensagem: 'Aluno cadastrado com sucesso',

      aluno: {

        id: resultado.insertId,

        nome: dados.nome,

        email: dados.email,

        cpf: dados.cpf,

      },

    };

  }

  async login(dados: any) {

    const pool = this.databaseService.getPool();

    const [alunos]: any = await pool.query(

      'SELECT * FROM aluno WHERE email = ?',

      [dados.email],

    );

    if (alunos.length === 0) {

      return {

        mensagem: 'E-mail ou senha incorretos',

      };

    }

    const aluno = alunos[0];

    const senhaCorreta = await bcrypt.compare(

      dados.senha,

      aluno.senha,

    );

    if (!senhaCorreta) {

      return {

        mensagem: 'E-mail ou senha incorretos',

      };

    }

    return {

      mensagem: 'Login realizado com sucesso',

      aluno: {

        id: aluno.id_aluno,

        nome: aluno.nome,

        email: aluno.email,

        cpf: aluno.cpf,

        data_cadastro: aluno.data_cadastro,

      },

    };

  }

  async listar(usuarioId: number, tipoUsuario: string) {

    const pool = this.databaseService.getPool();

    if (tipoUsuario === 'aluno') {

      const [alunos]: any = await pool.query(

        `SELECT

          id_aluno,

          nome,

          email,

          cpf,

          data_cadastro

         FROM aluno

         WHERE id_aluno = ?`,

        [usuarioId],

      );

      return alunos;

    }

    const [alunos]: any = await pool.query(

      `SELECT

        a.id_aluno,

        a.nome,

        a.email,

        a.cpf,

        a.data_cadastro

       FROM aluno a

       INNER JOIN professor_aluno pa

         ON pa.id_aluno = a.id_aluno

       WHERE pa.id_professor = ?

       AND pa.status = 'Ativo'

       ORDER BY a.id_aluno DESC`,

      [usuarioId],

    );

    return alunos;

  }

  async buscarPorId(

    id: number,

    usuarioId: number,

    tipoUsuario: string,

  ) {

    const pool = this.databaseService.getPool();

    if (tipoUsuario === 'aluno' && id !== usuarioId) {

      return {

        mensagem: 'Você só pode consultar seus próprios dados',

      };

    }

    if (tipoUsuario === 'professor') {

      const [vinculo]: any = await pool.query(

        `SELECT id_professor_aluno

         FROM professor_aluno

         WHERE id_professor = ?

         AND id_aluno = ?

         AND status = 'Ativo'`,

        [usuarioId, id],

      );

      if (vinculo.length === 0) {

        return {

          mensagem: 'Você não está vinculado a esse aluno',

        };

      }

    }

    const [alunos]: any = await pool.query(

      `SELECT

        id_aluno,

        nome,

        email,

        cpf,

        data_cadastro

       FROM aluno

       WHERE id_aluno = ?`,

      [id],

    );

    if (alunos.length === 0) {

      return {

        mensagem: 'Aluno não encontrado',

      };

    }

    return alunos[0];

  }

}
 