import { Injectable } from '@nestjs/common';

import { DatabaseService } from '../database/database.service';

@Injectable()

export class EvolucaoService {

  constructor(

    private readonly databaseService: DatabaseService,

  ) {}

  async cadastrar(

    dados: any,

    usuarioId: number,

    tipoUsuario: string,

  ) {

    const pool = this.databaseService.getPool();

    if (

      tipoUsuario === 'aluno' &&

      dados.id_aluno !== usuarioId

    ) {

      return {

        mensagem: 'Você só pode cadastrar sua própria evolução',

      };

    }

    const [alunos]: any = await pool.query(

      `SELECT id_aluno

       FROM aluno

       WHERE id_aluno = ?`,

      [dados.id_aluno]

    );

    if (alunos.length === 0) {

      return {

        mensagem: 'Aluno não encontrado'

      };

    }

    const [resultado]: any = await pool.query(

      `INSERT INTO evolucao

      (

        id_aluno,

        peso,

        carga

      )

      VALUES (?, ?, ?)`,

      [

        dados.id_aluno,

        dados.peso,

        dados.carga

      ]

    );

    const [evolucoes]: any = await pool.query(

      `SELECT *

       FROM evolucao

       WHERE id_evolucao = ?`,

      [resultado.insertId]

    );

    return {

      mensagem: 'Evolução cadastrada com sucesso',

      evolucao: evolucoes[0]

    };

  }

  async listar(

    usuarioId: number,

    tipoUsuario: string,

  ) {

    const pool = this.databaseService.getPool();

    if (tipoUsuario === 'aluno') {

      const [evolucoes]: any = await pool.query(

        `SELECT *

         FROM evolucao

         WHERE id_aluno = ?

         ORDER BY id_evolucao DESC`,

        [usuarioId]

      );

      return evolucoes;

    }

    const [evolucoes]: any = await pool.query(

      `SELECT *

       FROM evolucao

       ORDER BY id_evolucao DESC`

    );

    return evolucoes;

  }

  async buscarPorAluno(

    id_aluno: number,

    usuarioId: number,

    tipoUsuario: string,

  ) {

    const pool = this.databaseService.getPool();

    if (

      tipoUsuario === 'aluno' &&

      id_aluno !== usuarioId

    ) {

      return {

        mensagem: 'Você não tem acesso à evolução desse aluno',

      };

    }

    const [evolucoes]: any = await pool.query(

      `SELECT *

       FROM evolucao

       WHERE id_aluno = ?

       ORDER BY id_evolucao DESC`,

      [id_aluno]

    );

    return evolucoes;

  }

}
 