import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { DatabaseService } from '../database/database.service';

@Injectable()
export class AlunoService {

  constructor(
    private readonly databaseService: DatabaseService
  ) {}


  // =====================================================
  // CADASTRO
  // =====================================================

  async cadastro(dados: any) {

    const pool = this.databaseService.getPool();


    // Normaliza os dados
    const email = dados.email.trim().toLowerCase();

    const cpf = dados.cpf.replace(/\D/g, '');

    const telefone = dados.telefone
      ? dados.telefone.replace(/\D/g, '')
      : null;


    // Verifica se e-mail ou CPF já existem
    const [alunoExiste]: any = await pool.query(
      `
      SELECT id_aluno
      FROM aluno
      WHERE email = ? OR cpf = ?
      `,
      [
        email,
        cpf
      ]
    );


    if (alunoExiste.length > 0) {

      return {
        mensagem: 'E-mail ou CPF já cadastrado'
      };

    }


    // Criptografa a senha
    const senhaCriptografada =
      await bcrypt.hash(
        dados.senha,
        10
      );


    // Insere no banco
    const [resultado]: any = await pool.query(
      `
      INSERT INTO aluno
      (nome, email, senha, telefone, cpf)
      VALUES (?, ?, ?, ?, ?)
      `,
      [
        dados.nome,
        email,
        senhaCriptografada,
        telefone,
        cpf
      ]
    );


    return {

      mensagem:
        'Aluno cadastrado com sucesso',

      aluno: {

        id: resultado.insertId,

        nome: dados.nome,

        email: email,

        telefone: telefone,

        cpf: cpf

      }

    };

  }


  // =====================================================
  // LOGIN
  // =====================================================

  async login(dados: any) {

    const pool =
      this.databaseService.getPool();


    const email =
      dados.email.trim().toLowerCase();


    const [alunos]: any =
      await pool.query(
        `
        SELECT *
        FROM aluno
        WHERE email = ?
        `,
        [email]
      );


    if (alunos.length === 0) {

      return {
        mensagem:
          'E-mail ou senha incorretos'
      };

    }


    const aluno = alunos[0];


    const senhaCorreta =
      await bcrypt.compare(
        dados.senha,
        aluno.senha
      );


    if (!senhaCorreta) {

      return {
        mensagem:
          'E-mail ou senha incorretos'
      };

    }


    return {

      mensagem:
        'Login realizado com sucesso',

      aluno: {

        id: aluno.id_aluno,

        nome: aluno.nome,

        email: aluno.email,

        telefone: aluno.telefone,

        cpf: aluno.cpf,

        data_cadastro:
          aluno.data_cadastro

      }

    };

  }


  // =====================================================
  // LISTAR ALUNOS
  // =====================================================

  async listar() {

    const pool =
      this.databaseService.getPool();


    const [alunos]: any =
      await pool.query(
        `
        SELECT
          id_aluno,
          nome,
          email,
          telefone,
          cpf,
          data_cadastro
        FROM aluno
        `
      );


    return alunos;

  }


  // =====================================================
  // BUSCAR ALUNO POR ID
  // =====================================================

  async buscarPorId(id: number) {

    const pool =
      this.databaseService.getPool();


    const [alunos]: any =
      await pool.query(
        `
        SELECT
          id_aluno,
          nome,
          email,
          telefone,
          cpf,
          data_cadastro
        FROM aluno
        WHERE id_aluno = ?
        `,
        [id]
      );


    if (alunos.length === 0) {

      return {
        mensagem:
          'Aluno não encontrado'
      };

    }


    return alunos[0];

  }

}