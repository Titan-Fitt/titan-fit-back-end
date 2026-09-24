import { Injectable } from '@nestjs/common';import { DatabaseService } from '../database/database.service';
@Injectable()export class AlunoPlanoService {
  constructor(
    private readonly databaseService: DatabaseService,
  ) {}

  async cadastrar(
    dados: any,
    usuarioId: number,
    tipoUsuario: string,
  ) {
    const pool = this.databaseService.getPool();

    if (tipoUsuario === 'aluno' && dados.id_aluno !== usuarioId) {
      return {
        mensagem: 'Você só pode criar um plano para o seu próprio cadastro',
      };
    }

    if (tipoUsuario === 'professor') {
      const [vinculo]: any = await pool.query(
        `SELECT id_professor_aluno
         FROM professor_aluno
         WHERE id_professor = ?
         AND id_aluno = ?
         AND status = 'Ativo'`,
        [usuarioId, dados.id_aluno],
      );

      if (vinculo.length === 0) {
        return {
          mensagem: 'Você não está vinculado a esse aluno',
        };
      }
    }

    const [alunos]: any = await pool.query(
      `SELECT id_aluno
       FROM aluno
       WHERE id_aluno = ?`,
      [dados.id_aluno],
    );

    if (alunos.length === 0) {
      return { mensagem: 'Aluno não encontrado' };
    }

    const [planos]: any = await pool.query(
      `SELECT id_plano
       FROM plano
       WHERE id_plano = ?`,
      [dados.id_plano],
    );

    if (planos.length === 0) {
      return { mensagem: 'Plano não encontrado' };
    }

    const [planoAtivo]: any = await pool.query(
      `SELECT id_aluno_plano
       FROM aluno_plano
       WHERE id_aluno = ?
       AND status = 'Ativo'`,
      [dados.id_aluno],
    );

    if (planoAtivo.length > 0) {
      return {
        mensagem: 'Esse aluno já possui um plano ativo',
      };
    }

    const [resultado]: any = await pool.query(
      `INSERT INTO aluno_plano
       (id_aluno, id_plano, data_inicio, data_fim, status)
       VALUES (?, ?, ?, ?, ?)`,
      [
        dados.id_aluno,
        dados.id_plano,
        dados.data_inicio,
        dados.data_fim,
        dados.status,
      ],
    );

    const [alunoPlanos]: any = await pool.query(
      `SELECT *
       FROM aluno_plano
       WHERE id_aluno_plano = ?`,
      [resultado.insertId],
    );

    return {
      mensagem: 'Plano vinculado ao aluno com sucesso',
      alunoPlano: alunoPlanos[0],
    };
  }

  async listar(
    usuarioId: number,
    tipoUsuario: string,
  ) {
    const pool = this.databaseService.getPool();

    if (tipoUsuario === 'aluno') {
      const [alunoPlanos]: any = await pool.query(
        `SELECT *
         FROM aluno_plano
         WHERE id_aluno = ?
         ORDER BY id_aluno_plano DESC`,
        [usuarioId],
      );

      return alunoPlanos;
    }

    const [alunoPlanos]: any = await pool.query(
      `SELECT ap.*
       FROM aluno_plano ap
       INNER JOIN professor_aluno pa
         ON pa.id_aluno = ap.id_aluno
       WHERE pa.id_professor = ?
       AND pa.status = 'Ativo'
       ORDER BY ap.id_aluno_plano DESC`,
      [usuarioId],
    );

    return alunoPlanos;
  }

  async buscarPorId(
    id: number,
    usuarioId: number,
    tipoUsuario: string,
  ) {
    const pool = this.databaseService.getPool();

    if (tipoUsuario === 'aluno') {
      const [alunoPlanos]: any = await pool.query(
        `SELECT *
         FROM aluno_plano
         WHERE id_aluno_plano = ?
         AND id_aluno = ?`,
        [id, usuarioId],
      );

      if (alunoPlanos.length === 0) {
        return {
          mensagem: 'Plano do aluno não encontrado',
        };
      }

      return alunoPlanos[0];
    }

    const [alunoPlanos]: any = await pool.query(
      `SELECT ap.*
       FROM aluno_plano ap
       INNER JOIN professor_aluno pa
         ON pa.id_aluno = ap.id_aluno
       WHERE ap.id_aluno_plano = ?
       AND pa.id_professor = ?
       AND pa.status = 'Ativo'`,
      [id, usuarioId],
    );

    if (alunoPlanos.length === 0) {
      return {
        mensagem: 'Plano do aluno não encontrado',
      };
    }

    return alunoPlanos[0];
  }

  async buscarPorAluno(
    id_aluno: number,
    usuarioId: number,
    tipoUsuario: string,
  ) {
    const pool = this.databaseService.getPool();

    if (tipoUsuario === 'aluno' && id_aluno !== usuarioId) {
      return {
        mensagem: 'Você só pode consultar seus próprios planos',
      };
    }

    if (tipoUsuario === 'professor') {
      const [vinculo]: any = await pool.query(
        `SELECT id_professor_aluno
         FROM professor_aluno
         WHERE id_professor = ?
         AND id_aluno = ?
         AND status = 'Ativo'`,
        [usuarioId, id_aluno],
      );

      if (vinculo.length === 0) {
        return {
          mensagem: 'Você não está vinculado a esse aluno',
        };
      }
    }

    const [alunoPlanos]: any = await pool.query(
      `SELECT *
       FROM aluno_plano
       WHERE id_aluno = ?
       ORDER BY id_aluno_plano DESC`,
      [id_aluno],
    );

    return alunoPlanos;
  }

  async buscarPorPlano(
    id_plano: number,
    usuarioId: number,
    tipoUsuario: string,
  ) {
    const pool = this.databaseService.getPool();

    if (tipoUsuario === 'aluno') {
      const [alunoPlanos]: any = await pool.query(
        `SELECT *
         FROM aluno_plano
         WHERE id_plano = ?
         AND id_aluno = ?
         ORDER BY id_aluno_plano DESC`,
        [id_plano, usuarioId],
      );

      return alunoPlanos;
    }

    const [alunoPlanos]: any = await pool.query(
      `SELECT ap.*
       FROM aluno_plano ap
       INNER JOIN professor_aluno pa
         ON pa.id_aluno = ap.id_aluno
       WHERE ap.id_plano = ?
       AND pa.id_professor = ?
       AND pa.status = 'Ativo'
       ORDER BY ap.id_aluno_plano DESC`,
      [id_plano, usuarioId],
    );

    return alunoPlanos;
  }
}
