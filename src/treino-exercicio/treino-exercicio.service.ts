import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class TreinoExercicioService {
  constructor(
    private readonly databaseService: DatabaseService
  ) {}

  async cadastrar(dados: any) {
    const pool = this.databaseService.getPool();

    const [exercicios]: any = await pool.query(
      `SELECT id_exercicio
       FROM exercicio
       WHERE id_exercicio = ?`,
      [dados.id_exercicio]
    );

    if (exercicios.length === 0) {
      return {
        mensagem: 'Exercício não encontrado'
      };
    }

    const [treinos]: any = await pool.query(
      `SELECT id_treino
       FROM treino
       WHERE id_treino = ?`,
      [dados.id_treino]
    );

    if (treinos.length === 0) {
      return {
        mensagem: 'Treino não encontrado'
      };
    }

    const [resultado]: any = await pool.query(
      `INSERT INTO treino_exercicio
      (
        carga,
        ordem,
        serie,
        repeticoes,
        descanso,
        observacao,
        id_exercicio,
        id_treino
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        dados.carga,
        dados.ordem,
        dados.serie,
        dados.repeticoes,
        dados.descanso,
        dados.observacao,
        dados.id_exercicio,
        dados.id_treino
      ]
    );

    const [itens]: any = await pool.query(
      `SELECT *
       FROM treino_exercicio
       WHERE id_treino_exercicio = ?`,
      [resultado.insertId]
    );

    return {
      mensagem: 'Exercício adicionado ao treino com sucesso',
      treinoExercicio: itens[0]
    };
  }

  async listar() {
    const pool = this.databaseService.getPool();

    const [itens]: any = await pool.query(
      `SELECT *
       FROM treino_exercicio`
    );

    return itens;
  }

  async buscarPorId(id: number) {
    const pool = this.databaseService.getPool();

    const [itens]: any = await pool.query(
      `SELECT *
       FROM treino_exercicio
       WHERE id_treino_exercicio = ?`,
      [id]
    );

    if (itens.length === 0) {
      return {
        mensagem: 'Registro não encontrado'
      };
    }

    return itens[0];
  }

  async buscarPorTreino(id_treino: number) {
    const pool = this.databaseService.getPool();

    const [itens]: any = await pool.query(
      `SELECT *
       FROM treino_exercicio
       WHERE id_treino = ?
       ORDER BY ordem ASC`,
      [id_treino]
    );

    return itens;
  }
}
