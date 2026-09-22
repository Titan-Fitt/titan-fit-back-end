import { Injectable } from '@nestjs/common';

import { DatabaseService } from '../database/database.service';

@Injectable()

export class TreinoService {

  constructor(

    private readonly databaseService: DatabaseService

  ) {}

  async cadastrar(dados: any) {

    const pool = this.databaseService.getPool();

    const [fichas]: any = await pool.query(

      `SELECT id_ficha

       FROM ficha_aluno

       WHERE id_ficha = ?`,

      [dados.id_ficha]

    );

    if (fichas.length === 0) {

      return {

        mensagem: 'Ficha do aluno não encontrada'

      };

    }

    const [professores]: any = await pool.query(

      `SELECT id_professor

       FROM professor

       WHERE id_professor = ?`,

      [dados.id_professor]

    );

    if (professores.length === 0) {

      return {

        mensagem: 'Professor não encontrado'

      };

    }

    const [resultado]: any = await pool.query(

      `INSERT INTO treino

      (

        nome_treino,

        tipo_treino,

        objetivo,

        id_ficha,

        id_professor

      )

      VALUES (?, ?, ?, ?, ?)`,

      [

        dados.nome_treino,

        dados.tipo_treino,

        dados.objetivo,

        dados.id_ficha,

        dados.id_professor

      ]

    );

    const [treinos]: any = await pool.query(

      `SELECT *

       FROM treino

       WHERE id_treino = ?`,

      [resultado.insertId]

    );

    return {

      mensagem: 'Treino cadastrado com sucesso',

      treino: treinos[0]

    };

  }

  async listar() {

    const pool = this.databaseService.getPool();

    const [treinos]: any = await pool.query(

      `SELECT *

       FROM treino`

    );

    return treinos;

  }

  async buscarPorId(id: number) {

    const pool = this.databaseService.getPool();

    const [treinos]: any = await pool.query(

      `SELECT *

       FROM treino

       WHERE id_treino = ?`,

      [id]

    );

    if (treinos.length === 0) {

      return {

        mensagem: 'Treino não encontrado'

      };

    }

    return treinos[0];

  }

  async buscarPorFicha(id_ficha: number) {

    const pool = this.databaseService.getPool();

    const [treinos]: any = await pool.query(

      `SELECT *

       FROM treino

       WHERE id_ficha = ?`,

      [id_ficha]

    );

    return treinos;

  }

  async buscarPorProfessor(id_professor: number) {

    const pool = this.databaseService.getPool();

    const [treinos]: any = await pool.query(

      `SELECT *

       FROM treino

       WHERE id_professor = ?`,

      [id_professor]

    );

    return treinos;

  }

}
 