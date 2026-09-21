import { Injectable } from '@nestjs/common';

import { DatabaseService } from '../database/database.service';

@Injectable()

export class EvolucaoService {

  constructor(

    private readonly databaseService: DatabaseService

  ) {}

  async cadastrar(dados: any) {

    const pool = this.databaseService.getPool();

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

  async listar() {

    const pool = this.databaseService.getPool();

    const [evolucoes]: any = await pool.query(

      `SELECT *

       FROM evolucao`

    );

    return evolucoes;

  }

  async buscarPorAluno(id_aluno: number) {

    const pool = this.databaseService.getPool();

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
 