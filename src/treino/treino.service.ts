import { Injectable } from '@nestjs/common';import { DatabaseService } from '../database/database.service';
@Injectable()export class TreinoService {
  constructor(
    private readonly databaseService: DatabaseService,
  ) {}

  async cadastrar(dados: any, professorLogadoId: number) {
    const pool = this.databaseService.getPool();

    if (dados.id_professor !== professorLogadoId) {
      return {
        mensagem: 'Você só pode criar treinos usando o seu próprio professor',
      };
    }

    const [fichas]: any = await pool.query(
      `SELECT id_ficha, id_aluno
       FROM ficha_aluno
       WHERE id_ficha = ?`,
      [dados.id_ficha],
    );

    if (fichas.length === 0) {
      return {
        mensagem: 'Ficha do aluno não encontrada',
      };
    }

    const idAluno = fichas[0].id_aluno;

    const [vinculo]: any = await pool.query(
      `SELECT id_professor_aluno
       FROM professor_aluno
       WHERE id_professor = ?
       AND id_aluno = ?
       AND status = 'Ativo'`,
      [professorLogadoId, idAluno],
    );

    if (vinculo.length === 0) {
      return {
        mensagem: 'Você não está vinculado a esse aluno',
      };
    }

    const [professores]: any = await pool.query(
      `SELECT id_professor
       FROM professor
       WHERE id_professor = ?`,
      [dados.id_professor],
    );

    if (professores.length === 0) {
      return {
        mensagem: 'Professor não encontrado',
      };
    }

    const [resultado]: any = await pool.query(
      `INSERT INTO treino
       (nome_treino, tipo_treino, objetivo, id_ficha, id_professor)
       VALUES (?, ?, ?, ?, ?)`,
      [
        dados.nome_treino,
        dados.tipo_treino,
        dados.objetivo,
        dados.id_ficha,
        dados.id_professor,
      ],
    );

    const [treinos]: any = await pool.query(
      `SELECT *
       FROM treino
       WHERE id_treino = ?`,
      [resultado.insertId],
    );

    return {
      mensagem: 'Treino cadastrado com sucesso',
      treino: treinos[0],
    };
  }

  async listar(usuarioId: number, tipoUsuario: string) {
    const pool = this.databaseService.getPool();

    if (tipoUsuario === 'aluno') {
      const [treinos]: any = await pool.query(
        `SELECT t.*
         FROM treino t
         INNER JOIN ficha_aluno f
           ON f.id_ficha = t.id_ficha
         WHERE f.id_aluno = ?
         ORDER BY t.id_treino DESC`,
        [usuarioId],
      );

      return treinos;
    }

    const [treinos]: any = await pool.query(
      `SELECT *
       FROM treino
       WHERE id_professor = ?
       ORDER BY id_treino DESC`,
      [usuarioId],
    );

    return treinos;
  }

  async buscarPorId(
    id: number,
    usuarioId: number,
    tipoUsuario: string,
  ) {
    const pool = this.databaseService.getPool();

    let query = `SELECT t.* FROM treino t`;
    const parametros: any[] = [id];

    if (tipoUsuario === 'aluno') {
      query += `
        INNER JOIN ficha_aluno f
          ON f.id_ficha = t.id_ficha
        WHERE t.id_treino = ?
        AND f.id_aluno = ?
      `;

      parametros.push(usuarioId);
    } else {
      query += `
        WHERE t.id_treino = ?
        AND t.id_professor = ?
      `;

      parametros.push(usuarioId);
    }

    const [treinos]: any = await pool.query(
      query,
      parametros,
    );

    if (treinos.length === 0) {
      return {
        mensagem: 'Treino não encontrado',
      };
    }

    return treinos[0];
  }

  async buscarPorFicha(
    id_ficha: number,
    usuarioId: number,
    tipoUsuario: string,
  ) {
    const pool = this.databaseService.getPool();

    if (tipoUsuario === 'aluno') {
      const [fichas]: any = await pool.query(
        `SELECT id_ficha
         FROM ficha_aluno
         WHERE id_ficha = ?
         AND id_aluno = ?`,
        [id_ficha, usuarioId],
      );

      if (fichas.length === 0) {
        return {
          mensagem: 'Você não tem acesso a essa ficha',
        };
      }
    } else {
      const [treinos]: any = await pool.query(
        `SELECT t.*
         FROM treino t
         WHERE t.id_ficha = ?
         AND t.id_professor = ?
         ORDER BY t.id_treino DESC`,
        [id_ficha, usuarioId],
      );

      return treinos;
    }

    const [treinos]: any = await pool.query(
      `SELECT *
       FROM treino
       WHERE id_ficha = ?
       ORDER BY id_treino DESC`,
      [id_ficha],
    );

    return treinos;
  }

  async buscarPorProfessor(
    id_professor: number,
    usuarioId: number,
    tipoUsuario: string,
  ) {
    const pool = this.databaseService.getPool();

    if (
      tipoUsuario === 'professor' &&id_professor !== usuarioId    ) {
      return {
        mensagem: 'Você só pode consultar seus próprios treinos',
      };
    }

    const [treinos]: any = await pool.query(
      `SELECT *
       FROM treino
       WHERE id_professor = ?
       ORDER BY id_treino DESC`,
      [id_professor],
    );

    return treinos;
  }
}
