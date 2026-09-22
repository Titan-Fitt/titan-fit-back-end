import { Injectable } from '@nestjs/common';

import * as bcrypt from 'bcrypt';

import { DatabaseService } from '../database/database.service';

@Injectable()

export class ProfessorService {

  constructor(

    private readonly databaseService: DatabaseService

  ) {}

  async cadastro(dados: any) {

    const pool = this.databaseService.getPool();

    const [professoresExistentes]: any = await pool.query(

      `SELECT id_professor

       FROM professor

       WHERE email = ? OR registro_cref = ?`,

      [dados.email, dados.registro_cref]

    );

    if (professoresExistentes.length > 0) {

      return {

        mensagem: 'E-mail ou registro CREF já cadastrado'

      };

    }

    const senhaCriptografada = await bcrypt.hash(

      dados.senha,

      10

    );

    const [resultado]: any = await pool.query(

      `INSERT INTO professor

      (

        nome,

        curriculo,

        email,

        senha,

        registro_cref,

        bacharelado,

        formacao_academica,

        status,

        especialidade

      )

      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,

      [

        dados.nome,

        dados.curriculo,

        dados.email,

        senhaCriptografada,

        dados.registro_cref,

        dados.bacharelado,

        dados.formacao_academica,

        dados.status,

        dados.especialidade

      ]

    );

    return {

      mensagem: 'Professor cadastrado com sucesso',

      professor: {

        id: resultado.insertId,

        nome: dados.nome,

        email: dados.email,

        registro_cref: dados.registro_cref,

        bacharelado: dados.bacharelado,

        formacao_academica: dados.formacao_academica,

        status: dados.status,

        especialidade: dados.especialidade

      }

    };

  }

  async login(dados: any) {

    const pool = this.databaseService.getPool();

    const [professores]: any = await pool.query(

      `SELECT *

       FROM professor

       WHERE email = ?`,

      [dados.email]

    );

    if (professores.length === 0) {

      return {

        mensagem: 'E-mail ou senha incorretos'

      };

    }

    const professor = professores[0];

    const senhaCorreta = await bcrypt.compare(

      dados.senha,

      professor.senha

    );

    if (!senhaCorreta) {

      return {

        mensagem: 'E-mail ou senha incorretos'

      };

    }

    return {

      mensagem: 'Login realizado com sucesso',

      professor: {

        id: professor.id_professor,

        nome: professor.nome,

        email: professor.email,

        curriculo: professor.curriculo,

        registro_cref: professor.registro_cref,

        bacharelado: professor.bacharelado,

        formacao_academica: professor.formacao_academica,

        status: professor.status,

        especialidade: professor.especialidade

      }

    };

  }

  async listar() {

    const pool = this.databaseService.getPool();

    const [professores]: any = await pool.query(

      `SELECT

        id_professor,

        nome,

        curriculo,

        email,

        registro_cref,

        bacharelado,

        formacao_academica,

        status,

        especialidade

       FROM professor`

    );

    return professores;

  }

  async buscarPorId(id: number) {

    const pool = this.databaseService.getPool();

    const [professores]: any = await pool.query(

      `SELECT

        id_professor,

        nome,

        curriculo,

        email,

        registro_cref,

        bacharelado,

        formacao_academica,

        status,

        especialidade

       FROM professor

       WHERE id_professor = ?`,

      [id]

    );

    if (professores.length === 0) {

      return {

        mensagem: 'Professor não encontrado'

      };

    }

    return professores[0];

  }

}
 