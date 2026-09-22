import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class AlunoPlanoService {
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

    const [planos]: any = await pool.query(
      `SELECT id_plano
       FROM plano
       WHERE id_plano = ?`,
      [dados.id_plano]
    );

    if (planos.length === 0) {
      return {
        mensagem: 'Plano não encontrado'
      };
    }

    const [planoAtivo]: any = await pool.query(
      `SELECT id_aluno_plano
       FROM aluno_plano
       WHERE id_aluno = ?
       AND status = 'Ativo'`,
      [dados.id_aluno]
    );

    if (planoAtivo.length > 0) {
      return {
        mensagem: 'Esse aluno já possui um plano ativo'
      };
    }

    const [resultado]: any = await pool.query(
      `INSERT INTO aluno_plano
      (
        id_aluno,
        id_plano,
        data_inicio,
        data_fim,
        status
      )
      VALUES (?, ?, ?, ?, ?)`,
      [
        dados.id_aluno,
        dados.id_plano,
        dados.data_inicio,
        dados.data_fim,
        dados.status
      ]
    );

    const [alunoPlanos]: any = await pool.query(
      `SELECT *
       FROM aluno_plano
       WHERE id_aluno_plano = ?`,
      [resultado.insertId]
    );

    return {
      mensagem: 'Plano vinculado ao aluno com sucesso',
      alunoPlano: alunoPlanos[0]
    };
  }

  async listar() {
    const pool = this.databaseService.getPool();

    const [alunoPlanos]: any = await pool.query(
      `SELECT *
       FROM aluno_plano`
    );

    return alunoPlanos;
  }

  async buscarPorId(id: number) {
    const pool = this.databaseService.getPool();

    const [alunoPlanos]: any = await pool.query(
      `SELECT *
       FROM aluno_plano
       WHERE id_aluno_plano = ?`,
      [id]
    );

    if (alunoPlanos.length === 0) {
      return {
        mensagem: 'Plano do aluno não encontrado'
      };
    }

    return alunoPlanos[0];
  }

  async buscarPorAluno(id_aluno: number) {
    const pool = this.databaseService.getPool();

    const [alunoPlanos]: any = await pool.query(
      `SELECT *
       FROM aluno_plano
       WHERE id_aluno = ?`,
      [id_aluno]
    );

    return alunoPlanos;
  }

  async buscarPorPlano(id_plano: number) {
    const pool = this.databaseService.getPool();

    const [alunoPlanos]: any = await pool.query(
      `SELECT *
       FROM aluno_plano
       WHERE id_plano = ?`,
      [id_plano]
    );

    return alunoPlanos;
  }
}
