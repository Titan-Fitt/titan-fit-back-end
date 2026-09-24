import { Injectable } from '@nestjs/common';import { DatabaseService } from '../database/database.service';
@Injectable()export class ProfessorAlunoService {
  constructor(
    private readonly databaseService: DatabaseService,
  ) {}

  async cadastrar(
    dados: any,
    professorLogadoId: number,
  ) {
    const pool = this.databaseService.getPool();

    if (dados.id_professor !== professorLogadoId) {
      return {
        mensagem: 'Você só pode criar vínculos para o seu próprio professor',
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

    const [alunos]: any = await pool.query(
      `SELECT id_aluno
       FROM aluno
       WHERE id_aluno = ?`,
      [dados.id_aluno],
    );

    if (alunos.length === 0) {
      return {
        mensagem: 'Aluno não encontrado',
      };
    }

    const [vinculoExiste]: any = await pool.query(
      `SELECT id_professor_aluno
       FROM professor_aluno
       WHERE id_professor = ?
       AND id_aluno = ?`,
      [dados.id_professor, dados.id_aluno],
    );

    if (vinculoExiste.length > 0) {
      return {
        mensagem: 'Esse professor já está vinculado a esse aluno',
      };
    }

    const [resultado]: any = await pool.query(
      `INSERT INTO professor_aluno
      (
        id_professor,
        id_aluno,
        status
      )
      VALUES (?, ?, ?)`,
      [
        dados.id_professor,
        dados.id_aluno,
        dados.status,
      ],
    );

    const [vinculos]: any = await pool.query(
      `SELECT *
       FROM professor_aluno
       WHERE id_professor_aluno = ?`,
      [resultado.insertId],
    );

    return {
      mensagem: 'Professor vinculado ao aluno com sucesso',
      professorAluno: vinculos[0],
    };
  }

  async listar(
    usuarioId: number,
    tipoUsuario: string,
  ) {
    const pool = this.databaseService.getPool();

    if (tipoUsuario === 'professor') {
      const [vinculos]: any = await pool.query(
        `SELECT *
         FROM professor_aluno
         WHERE id_professor = ?
         ORDER BY id_professor_aluno DESC`,
        [usuarioId],
      );

      return vinculos;
    }

    const [vinculos]: any = await pool.query(
      `SELECT *
       FROM professor_aluno
       WHERE id_aluno = ?
       ORDER BY id_professor_aluno DESC`,
      [usuarioId],
    );

    return vinculos;
  }

  async buscarPorId(
    id: number,
    usuarioId: number,
    tipoUsuario: string,
  ) {
    const pool = this.databaseService.getPool();

    let query = `
      SELECT *
      FROM professor_aluno
      WHERE id_professor_aluno = ?
    `;

    const parametros: any[] = [id];

    if (tipoUsuario === 'professor') {
      query += ` AND id_professor = ?`;
      parametros.push(usuarioId);
    } else {
      query += ` AND id_aluno = ?`;
      parametros.push(usuarioId);
    }

    const [vinculos]: any = await pool.query(
      query,
      parametros,
    );

    if (vinculos.length === 0) {
      return {
        mensagem: 'Vínculo não encontrado',
      };
    }

    return vinculos[0];
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
        mensagem: 'Você só pode consultar seus próprios vínculos',
      };
    }

    if (tipoUsuario === 'aluno') {
      const [vinculos]: any = await pool.query(
        `SELECT *
         FROM professor_aluno
         WHERE id_professor = ?
         AND id_aluno = ?`,
        [id_professor, usuarioId],
      );

      return vinculos;
    }

    const [vinculos]: any = await pool.query(
      `SELECT *
       FROM professor_aluno
       WHERE id_professor = ?
       ORDER BY id_professor_aluno DESC`,
      [id_professor],
    );

    return vinculos;
  }

  async buscarPorAluno(
    id_aluno: number,
    usuarioId: number,
    tipoUsuario: string,
  ) {
    const pool = this.databaseService.getPool();

    if (
      tipoUsuario === 'aluno' &&id_aluno !== usuarioId    ) {
      return {
        mensagem: 'Você só pode consultar seus próprios vínculos',
      };
    }

    if (tipoUsuario === 'professor') {
      const [vinculos]: any = await pool.query(
        `SELECT *
         FROM professor_aluno
         WHERE id_aluno = ?
         AND id_professor = ?
         ORDER BY id_professor_aluno DESC`,
        [id_aluno, usuarioId],
      );

      return vinculos;
    }

    const [vinculos]: any = await pool.query(
      `SELECT *
       FROM professor_aluno
       WHERE id_aluno = ?
       ORDER BY id_professor_aluno DESC`,
      [id_aluno],
    );

    return vinculos;
  }
}
