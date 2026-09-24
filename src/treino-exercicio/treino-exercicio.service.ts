import { Injectable } from '@nestjs/common';import { DatabaseService } from '../database/database.service';
@Injectable()export class TreinoExercicioService {
  constructor(
    private readonly databaseService: DatabaseService,
  ) {}

  async cadastrar(
    dados: any,
    professorLogadoId: number,
  ) {
    const pool = this.databaseService.getPool();

    const [exercicios]: any = await pool.query(
      `SELECT id_exercicio
       FROM exercicio
       WHERE id_exercicio = ?`,
      [dados.id_exercicio],
    );

    if (exercicios.length === 0) {
      return {
        mensagem: 'Exercício não encontrado',
      };
    }

    const [treinos]: any = await pool.query(
      `SELECT id_treino, id_professor
       FROM treino
       WHERE id_treino = ?`,
      [dados.id_treino],
    );

    if (treinos.length === 0) {
      return {
        mensagem: 'Treino não encontrado',
      };
    }

    if (treinos[0].id_professor !== professorLogadoId) {
      return {
        mensagem: 'Você só pode adicionar exercícios aos seus próprios treinos',
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
        dados.id_treino,
      ],
    );

    const [itens]: any = await pool.query(
      `SELECT *
       FROM treino_exercicio
       WHERE id_treino_exercicio = ?`,
      [resultado.insertId],
    );

    return {
      mensagem: 'Exercício adicionado ao treino com sucesso',
      treinoExercicio: itens[0],
    };
  }

  async listar(
    usuarioId: number,
    tipoUsuario: string,
  ) {
    const pool = this.databaseService.getPool();

    if (tipoUsuario === 'aluno') {
      const [itens]: any = await pool.query(
        `SELECT te.*
         FROM treino_exercicio te
         INNER JOIN treino t
           ON t.id_treino = te.id_treino
         INNER JOIN ficha_aluno f
           ON f.id_ficha = t.id_ficha
         WHERE f.id_aluno = ?
         ORDER BY te.id_treino_exercicio DESC`,
        [usuarioId],
      );

      return itens;
    }

    const [itens]: any = await pool.query(
      `SELECT te.*
       FROM treino_exercicio te
       INNER JOIN treino t
         ON t.id_treino = te.id_treino
       WHERE t.id_professor = ?
       ORDER BY te.id_treino_exercicio DESC`,
      [usuarioId],
    );

    return itens;
  }

  async buscarPorId(
    id: number,
    usuarioId: number,
    tipoUsuario: string,
  ) {
    const pool = this.databaseService.getPool();

    let query = `
      SELECT te.*
      FROM treino_exercicio te
      INNER JOIN treino t
        ON t.id_treino = te.id_treino
    `;

    const parametros: any[] = [id];

    if (tipoUsuario === 'aluno') {
      query += `
        INNER JOIN ficha_aluno f
          ON f.id_ficha = t.id_ficha
        WHERE te.id_treino_exercicio = ?
        AND f.id_aluno = ?
      `;

      parametros.push(usuarioId);
    } else {
      query += `
        WHERE te.id_treino_exercicio = ?
        AND t.id_professor = ?
      `;

      parametros.push(usuarioId);
    }

    const [itens]: any = await pool.query(
      query,
      parametros,
    );

    if (itens.length === 0) {
      return {
        mensagem: 'Registro não encontrado',
      };
    }

    return itens[0];
  }

  async buscarPorTreino(
    id_treino: number,
    usuarioId: number,
    tipoUsuario: string,
  ) {
    const pool = this.databaseService.getPool();

    if (tipoUsuario === 'aluno') {
      const [treinos]: any = await pool.query(
        `SELECT t.id_treino
         FROM treino t
         INNER JOIN ficha_aluno f
           ON f.id_ficha = t.id_ficha
         WHERE t.id_treino = ?
         AND f.id_aluno = ?`,
        [id_treino, usuarioId],
      );

      if (treinos.length === 0) {
        return {
          mensagem: 'Você não tem acesso a esse treino',
        };
      }
    } else {
      const [treinos]: any = await pool.query(
        `SELECT id_treino
         FROM treino
         WHERE id_treino = ?
         AND id_professor = ?`,
        [id_treino, usuarioId],
      );

      if (treinos.length === 0) {
        return {
          mensagem: 'Você não tem acesso a esse treino',
        };
      }
    }

    const [itens]: any = await pool.query(
      `SELECT *
       FROM treino_exercicio
       WHERE id_treino = ?
       ORDER BY ordem ASC`,
      [id_treino],
    );

    return itens;
  }
}
