import { Injectable } from '@nestjs/common';

import { DatabaseService } from '../database/database.service';

@Injectable()

export class ExercicioService {

  constructor(

    private readonly databaseService: DatabaseService

  ) {}

  async cadastrar(dados: any) {

    const pool = this.databaseService.getPool();

    const [resultado]: any = await pool.query(

      `INSERT INTO exercicio

      (

        nome,

        grupo_muscular,

        video

      )

      VALUES (?, ?, ?)`,

      [

        dados.nome,

        dados.grupo_muscular,

        dados.video

      ]

    );

    const [exercicios]: any = await pool.query(

      `SELECT *

       FROM exercicio

       WHERE id_exercicio = ?`,

      [resultado.insertId]

    );

    return {

      mensagem: 'Exercício cadastrado com sucesso',

      exercicio: exercicios[0]

    };

  }

  async listar() {

    const pool = this.databaseService.getPool();

    const [exercicios]: any = await pool.query(

      `SELECT *

       FROM exercicio`

    );

    return exercicios;

  }

  async buscarPorId(id: number) {

    const pool = this.databaseService.getPool();

    const [exercicios]: any = await pool.query(

      `SELECT *

       FROM exercicio

       WHERE id_exercicio = ?`,

      [id]

    );

    if (exercicios.length === 0) {

      return {

        mensagem: 'Exercício não encontrado'

      };

    }

    return exercicios[0];

  }

}
 