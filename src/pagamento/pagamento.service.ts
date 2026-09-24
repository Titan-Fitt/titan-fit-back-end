import { Injectable } from '@nestjs/common';import { DatabaseService } from '../database/database.service';
@Injectable()export class PagamentoService {
  constructor(
    private readonly databaseService: DatabaseService,
  ) {}

  async cadastrar(
    dados: any,
    usuarioId: number,
    tipoUsuario: string,
  ) {
    const pool = this.databaseService.getPool();

    const [alunoPlanos]: any = await pool.query(
      `SELECT id_aluno_plano, id_aluno
       FROM aluno_plano
       WHERE id_aluno_plano = ?`,
      [dados.id_aluno_plano],
    );

    if (alunoPlanos.length === 0) {
      return {
        mensagem: 'Plano do aluno não encontrado',
      };
    }

    if (
      tipoUsuario === 'aluno' &&alunoPlanos[0].id_aluno !== usuarioId    ) {
      return {
        mensagem: 'Você só pode cadastrar pagamentos do seu próprio plano',
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
        dados.id_aluno_plano,
      ],
    );

    const [pagamentos]: any = await pool.query(
      `SELECT *
       FROM pagamento
       WHERE id_pagamento = ?`,
      [resultado.insertId],
    );

    return {
      mensagem: 'Pagamento cadastrado com sucesso',
      pagamento: pagamentos[0],
    };
  }

  async listar(
    usuarioId: number,
    tipoUsuario: string,
  ) {
    const pool = this.databaseService.getPool();

    if (tipoUsuario === 'aluno') {
      const [pagamentos]: any = await pool.query(
        `SELECT p.*
         FROM pagamento p
         INNER JOIN aluno_plano ap
           ON ap.id_aluno_plano = p.id_aluno_plano
         WHERE ap.id_aluno = ?
         ORDER BY p.id_pagamento DESC`,
        [usuarioId],
      );

      return pagamentos;
    }

    const [pagamentos]: any = await pool.query(
      `SELECT *
       FROM pagamento
       ORDER BY id_pagamento DESC`,
    );

    return pagamentos;
  }

  async buscarPorId(
    id: number,
    usuarioId: number,
    tipoUsuario: string,
  ) {
    const pool = this.databaseService.getPool();

    if (tipoUsuario === 'aluno') {
      const [pagamentos]: any = await pool.query(
        `SELECT p.*
         FROM pagamento p
         INNER JOIN aluno_plano ap
           ON ap.id_aluno_plano = p.id_aluno_plano
         WHERE p.id_pagamento = ?
         AND ap.id_aluno = ?`,
        [id, usuarioId],
      );

      if (pagamentos.length === 0) {
        return {
          mensagem: 'Pagamento não encontrado',
        };
      }

      return pagamentos[0];
    }

    const [pagamentos]: any = await pool.query(
      `SELECT *
       FROM pagamento
       WHERE id_pagamento = ?`,
      [id],
    );

    if (pagamentos.length === 0) {
      return {
        mensagem: 'Pagamento não encontrado',
      };
    }

    return pagamentos[0];
  }

  async buscarPorAlunoPlano(
    id_aluno_plano: number,
    usuarioId: number,
    tipoUsuario: string,
  ) {
    const pool = this.databaseService.getPool();

    if (tipoUsuario === 'aluno') {
      const [pagamentos]: any = await pool.query(
        `SELECT p.*
         FROM pagamento p
         INNER JOIN aluno_plano ap
           ON ap.id_aluno_plano = p.id_aluno_plano
         WHERE p.id_aluno_plano = ?
         AND ap.id_aluno = ?
         ORDER BY p.id_pagamento DESC`,
        [id_aluno_plano, usuarioId],
      );

      return pagamentos;
    }

    const [pagamentos]: any = await pool.query(
      `SELECT *
       FROM pagamento
       WHERE id_aluno_plano = ?
       ORDER BY id_pagamento DESC`,
      [id_aluno_plano],
    );

    return pagamentos;
  }
}
