import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class PagamentoService {
  constructor(
    private readonly databaseService: DatabaseService
  ) {}

  async cadastrar(dados: any) {
    const pool = this.databaseService.getPool();

    const [alunoPlanos]: any = await pool.query(
      `SELECT id_aluno_plano
       FROM aluno_plano
       WHERE id_aluno_plano = ?`,
      [dados.id_aluno_plano]
    );

    if (alunoPlanos.length === 0) {
      return {
        mensagem: 'Plano do aluno não encontrado'
      };
    }

    const [resultado]: any = await pool.query(
      `INSERT INTO pagamento
      (
        valor,
        metodo,
        status,
        data,
        comprovante,
        id_aluno_plano
      )
      VALUES (?, ?, ?, ?, ?, ?)`,
      [
        dados.valor,
        dados.metodo,
        dados.status,
        dados.data,
        dados.comprovante,
        dados.id_aluno_plano
      ]
    );

    const [pagamentos]: any = await pool.query(
      `SELECT *
       FROM pagamento
       WHERE id_pagamento = ?`,
      [resultado.insertId]
    );

    return {
      mensagem: 'Pagamento cadastrado com sucesso',
      pagamento: pagamentos[0]
    };
  }

  async listar() {
    const pool = this.databaseService.getPool();

    const [pagamentos]: any = await pool.query(
      `SELECT *
       FROM pagamento`
    );

    return pagamentos;
  }

  async buscarPorId(id: number) {
    const pool = this.databaseService.getPool();

    const [pagamentos]: any = await pool.query(
      `SELECT *
       FROM pagamento
       WHERE id_pagamento = ?`,
      [id]
    );

    if (pagamentos.length === 0) {
      return {
        mensagem: 'Pagamento não encontrado'
      };
    }

    return pagamentos[0];
  }

  async buscarPorAlunoPlano(id_aluno_plano: number) {
    const pool = this.databaseService.getPool();

    const [pagamentos]: any = await pool.query(
      `SELECT *
       FROM pagamento
       WHERE id_aluno_plano = ?
       ORDER BY id_pagamento DESC`,
      [id_aluno_plano]
    );

    return pagamentos;
  }
}
