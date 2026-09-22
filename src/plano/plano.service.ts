import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class PlanoService {
  constructor(
    private readonly databaseService: DatabaseService
  ) {}

  async cadastrar(dados: any) {
    const pool = this.databaseService.getPool();

    const [planoExiste]: any = await pool.query(
      `SELECT id_plano
       FROM plano
       WHERE nome = ?`,
      [dados.nome]
    );

    if (planoExiste.length > 0) {
      return {
        mensagem: 'Esse plano já está cadastrado'
      };
    }

    const [resultado]: any = await pool.query(
      `INSERT INTO plano
      (
        nome,
        descricao,
        valor,
        tipo_plano
      )
      VALUES (?, ?, ?, ?)`,
      [
        dados.nome,
        dados.descricao,
        dados.valor,
        dados.tipo_plano
      ]
    );

    const [planos]: any = await pool.query(
      `SELECT *
       FROM plano
       WHERE id_plano = ?`,
      [resultado.insertId]
    );

    return {
      mensagem: 'Plano cadastrado com sucesso',
      plano: planos[0]
    };
  }

  async listar() {
    const pool = this.databaseService.getPool();

    const [planos]: any = await pool.query(
      `SELECT *
       FROM plano`
    );

    return planos;
  }

  async buscarPorId(id: number) {
    const pool = this.databaseService.getPool();

    const [planos]: any = await pool.query(
      `SELECT *
       FROM plano
       WHERE id_plano = ?`,
      [id]
    );

    if (planos.length === 0) {
      return {
        mensagem: 'Plano não encontrado'
      };
    }

    return planos[0];
  }
}
