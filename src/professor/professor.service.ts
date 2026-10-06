import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class ProfessorService {

  constructor(
    private readonly databaseService: DatabaseService,
  ) {}

  // =====================================================
  // CADASTRO
  // POST /professor/cadastro
  // =====================================================

  async cadastro(dados: any) {

    const pool = this.databaseService.getPool();

    const [professoresExistentes]: any = await pool.query(
      `SELECT id_professor
       FROM professor
       WHERE email = ? OR registro_cref = ?`,
      [
        dados.email,
        dados.registro_cref,
      ],
    );

    if (professoresExistentes.length > 0) {
      return {
        mensagem: 'E-mail ou registro CREF já cadastrado',
      };
    }

    const senhaCriptografada = await bcrypt.hash(
      dados.senha,
      10,
    );

    const [resultado]: any = await pool.query(
      `INSERT INTO professor
      (
        nome,
        curriculo,
        email,
        senha,
        registro_cref,
        bacharelado,
        formacao_academica,
        status,
        especialidade
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        dados.nome,
        dados.curriculo,
        dados.email,
        senhaCriptografada,
        dados.registro_cref,
        dados.bacharelado,
        dados.formacao_academica,
        dados.status,
        dados.especialidade,
      ],
    );

    return {
      mensagem: 'Professor cadastrado com sucesso',

      professor: {
        id: resultado.insertId,
        nome: dados.nome,
        email: dados.email,
        registro_cref: dados.registro_cref,
        bacharelado: dados.bacharelado,
        formacao_academica: dados.formacao_academica,
        status: dados.status,
        especialidade: dados.especialidade,
        curriculo: dados.curriculo,
      },
    };
  }

  // =====================================================
  // LOGIN
  // POST /professor/login
  // =====================================================

  async login(dados: any) {

    const pool = this.databaseService.getPool();

    const [professores]: any = await pool.query(
      `SELECT *
       FROM professor
       WHERE email = ?`,
      [
        dados.email,
      ],
    );

    if (professores.length === 0) {
      return {
        mensagem: 'E-mail ou senha incorretos',
      };
    }

    const professor = professores[0];

    const senhaCorreta = await bcrypt.compare(
      dados.senha,
      professor.senha,
    );

    if (!senhaCorreta) {
      return {
        mensagem: 'E-mail ou senha incorretos',
      };
    }

    return {
      mensagem: 'Login realizado com sucesso',

      professor: {
        id: professor.id_professor,
        nome: professor.nome,
        email: professor.email,
        curriculo: professor.curriculo,
        registro_cref: professor.registro_cref,
        bacharelado: professor.bacharelado,
        formacao_academica: professor.formacao_academica,
        status: professor.status,
        especialidade: professor.especialidade,
      },
    };
  }

  // =====================================================
  // LISTAR PROFESSORES
  // GET /professor
  // =====================================================

  async listar(
    usuarioId: number,
    tipoUsuario: string,
  ) {

    const pool = this.databaseService.getPool();

    // Se for professor,
    // retorna somente os próprios dados
    if (tipoUsuario === 'professor') {

      const [professores]: any = await pool.query(
        `SELECT
          id_professor,
          nome,
          curriculo,
          email,
          registro_cref,
          bacharelado,
          formacao_academica,
          status,
          especialidade
         FROM professor
         WHERE id_professor = ?`,
        [
          usuarioId,
        ],
      );

      return professores;
    }

    // Se for aluno,
    // retorna todos os professores ativos
    const [professores]: any = await pool.query(
      `SELECT
        id_professor,
        nome,
        curriculo,
        email,
        registro_cref,
        bacharelado,
        formacao_academica,
        status,
        especialidade
       FROM professor
       WHERE status = 'ativo'
       ORDER BY id_professor DESC`,
    );

    return professores;
  }

  // =====================================================
  // BUSCAR PROFESSOR POR ID
  // GET /professor/:id
  // =====================================================

  async buscarPorId(
    id: number,
    usuarioId: number,
    tipoUsuario: string,
  ) {

    const pool = this.databaseService.getPool();

    // Professor só pode consultar
    // o próprio perfil
    if (
      tipoUsuario === 'professor' &&
      id !== usuarioId
    ) {

      return {
        mensagem: 'Você só pode consultar seus próprios dados',
      };
    }

    // Aluno só pode consultar
    // professor ao qual está vinculado
    if (tipoUsuario === 'aluno') {

      const [vinculo]: any = await pool.query(
        `SELECT id_professor_aluno
         FROM professor_aluno
         WHERE id_professor = ?
         AND id_aluno = ?
         AND status = 'Ativo'`,
        [
          id,
          usuarioId,
        ],
      );

      if (vinculo.length === 0) {

        return {
          mensagem: 'Você não está vinculado a esse professor',
        };
      }
    }

    const [professores]: any = await pool.query(
      `SELECT
        id_professor,
        nome,
        curriculo,
        email,
        registro_cref,
        bacharelado,
        formacao_academica,
        status,
        especialidade
       FROM professor
       WHERE id_professor = ?`,
      [
        id,
      ],
    );

    if (professores.length === 0) {

      return {
        mensagem: 'Professor não encontrado',
      };
    }

    return professores[0];
  }

  // =====================================================
  // ATUALIZAR PERFIL DO PROFESSOR
  // PUT /professor/:id
  // =====================================================

  async atualizar(
    id: number,
    usuarioId: number,
    tipoUsuario: string,
    dados: any,
  ) {

    const pool = this.databaseService.getPool();

    // ===================================================
    // PROFESSOR SÓ PODE ALTERAR O PRÓPRIO PERFIL
    // ===================================================

    if (
      tipoUsuario === 'professor' &&
      id !== usuarioId
    ) {

      return {
        mensagem: 'Você só pode alterar seus próprios dados',
      };
    }

    // ===================================================
    // VERIFICAR SE O PROFESSOR EXISTE
    // ===================================================

    const [professores]: any = await pool.query(
      `SELECT id_professor
       FROM professor
       WHERE id_professor = ?`,
      [
        id,
      ],
    );

    if (professores.length === 0) {

      return {
        mensagem: 'Professor não encontrado',
      };
    }

    // ===================================================
    // VERIFICAR E-MAIL OU CREF DUPLICADO
    // ===================================================

    const [duplicados]: any = await pool.query(
      `SELECT id_professor
       FROM professor
       WHERE
         (email = ? OR registro_cref = ?)
         AND id_professor <> ?`,
      [
        dados.email,
        dados.registro_cref,
        id,
      ],
    );

    if (duplicados.length > 0) {

      return {
        mensagem:
          'E-mail ou registro CREF já cadastrado por outro professor',
      };
    }

    // ===================================================
    // ATUALIZAR PROFESSOR
    // ===================================================

    await pool.query(
      `UPDATE professor
       SET
         nome = ?,
         email = ?,
         registro_cref = ?,
         especialidade = ?,
         bacharelado = ?,
         formacao_academica = ?,
         curriculo = ?
       WHERE id_professor = ?`,
      [
        dados.nome,
        dados.email,
        dados.registro_cref,
        dados.especialidade,
        dados.bacharelado,
        dados.formacao_academica,
        dados.curriculo,
        id,
      ],
    );

    // ===================================================
    // BUSCAR DADOS ATUALIZADOS
    // ===================================================

    const [professorAtualizado]: any = await pool.query(
      `SELECT
        id_professor,
        nome,
        curriculo,
        email,
        registro_cref,
        bacharelado,
        formacao_academica,
        status,
        especialidade
       FROM professor
       WHERE id_professor = ?`,
      [
        id,
      ],
    );

    // ===================================================
    // RETORNO
    // ===================================================

    return {
      mensagem: 'Perfil atualizado com sucesso',

      professor: professorAtualizado[0],
    };
  }
}