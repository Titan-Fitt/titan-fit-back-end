import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class ProfessorAlunoService {

  constructor(
    private readonly databaseService: DatabaseService,
  ) {}

  // =====================================================
  // CADASTRAR VÍNCULO
  // =====================================================

async cadastrar(
    dados: any,
    usuarioLogadoId: number,
    tipoUsuario: string,
) {
    const pool = this.databaseService.getPool();

    // ==========================================
    // SOMENTE ALUNO PODE SE CONECTAR
    // ==========================================

    if (tipoUsuario !== 'aluno') {
        return {
            mensagem: 'Apenas alunos podem se conectar a professores',
        };
    }

    // ==========================================
    // VERIFICAR PROFESSOR
    // ==========================================

    const [professores]: any = await pool.query(
        `SELECT id_professor
         FROM professor
         WHERE id_professor = ?
         AND status = 'ativo'`,
        [dados.id_professor],
    );

    if (professores.length === 0) {
        return {
            mensagem: 'Professor não encontrado ou inativo',
        };
    }

    // ==========================================
    // VERIFICAR ALUNO LOGADO
    // ==========================================

    const [alunos]: any = await pool.query(
        `SELECT id_aluno
         FROM aluno
         WHERE id_aluno = ?`,
        [usuarioLogadoId],
    );

    if (alunos.length === 0) {
        return {
            mensagem: 'Aluno não encontrado',
        };
    }

    // ==========================================
    // VERIFICAR SE JÁ POSSUI PROFESSOR
    // ==========================================

    const [professorAtual]: any = await pool.query(
        `SELECT
            id_professor_aluno,
            id_professor
         FROM professor_aluno
         WHERE id_aluno = ?
         AND status = 'Ativo'`,
        [usuarioLogadoId],
    );

    if (professorAtual.length > 0) {
        return {
            mensagem: 'Você já está conectado a um professor',
        };
    }

    // ==========================================
    // VERIFICAR VÍNCULO DUPLICADO
    // ==========================================

    const [vinculoExiste]: any = await pool.query(
        `SELECT id_professor_aluno
         FROM professor_aluno
         WHERE id_professor = ?
         AND id_aluno = ?`,
        [
            dados.id_professor,
            usuarioLogadoId,
        ],
    );

    if (vinculoExiste.length > 0) {
        return {
            mensagem: 'Esse professor já está vinculado a esse aluno',
        };
    }

    // ==========================================
    // CRIAR VÍNCULO
    // ==========================================

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
            usuarioLogadoId,
            'Ativo',
        ],
    );

    // ==========================================
    // BUSCAR VÍNCULO CRIADO
    // ==========================================

    const [vinculos]: any = await pool.query(
        `SELECT
            pa.id_professor_aluno,
            pa.id_professor,
            pa.id_aluno,
            pa.status,
            p.nome,
            p.email,
            p.especialidade,
            p.registro_cref
         FROM professor_aluno pa

         INNER JOIN professor p
             ON p.id_professor = pa.id_professor

         WHERE pa.id_professor_aluno = ?`,
        [resultado.insertId],
    );

    return {
        mensagem: 'Professor conectado com sucesso',
        professorAluno: vinculos[0],
    };
}
  // =====================================================
  // LISTAR VÍNCULOS
  // =====================================================

  async listar(
    usuarioId: number,
    tipoUsuario: string,
  ) {

    const pool = this.databaseService.getPool();

    // =====================================================
    // PROFESSOR
    // =====================================================

    if (tipoUsuario === 'professor') {

      const [vinculos]: any = await pool.query(
        `SELECT
          pa.id_professor_aluno,
          pa.id_professor,
          pa.id_aluno,
          pa.status,
          a.nome AS nome_aluno,
          a.email AS email_aluno

         FROM professor_aluno pa

         INNER JOIN aluno a
           ON a.id_aluno = pa.id_aluno

         WHERE pa.id_professor = ?

         ORDER BY pa.id_professor_aluno DESC`,
        [usuarioId],
      );

      return vinculos;
    }

    // =====================================================
    // ALUNO
    // =====================================================

    const [vinculos]: any = await pool.query(
      `SELECT
        pa.id_professor_aluno,
        pa.id_professor,
        pa.id_aluno,
        pa.status,

        p.nome,
        p.email,
        p.especialidade,
        p.registro_cref

       FROM professor_aluno pa

       INNER JOIN professor p
         ON p.id_professor = pa.id_professor

       WHERE pa.id_aluno = ?

       ORDER BY pa.id_professor_aluno DESC`,
      [usuarioId],
    );

    return vinculos;
  }

  // =====================================================
  // BUSCAR VÍNCULO POR ID
  // =====================================================

  async buscarPorId(
    id: number,
    usuarioId: number,
    tipoUsuario: string,
  ) {

    const pool = this.databaseService.getPool();

    let query = `
      SELECT
        pa.id_professor_aluno,
        pa.id_professor,
        pa.id_aluno,
        pa.status,

        p.nome,
        p.email,
        p.especialidade,
        p.registro_cref

      FROM professor_aluno pa

      INNER JOIN professor p
        ON p.id_professor = pa.id_professor

      WHERE pa.id_professor_aluno = ?
    `;

    const parametros: any[] = [id];

    if (tipoUsuario === 'professor') {

      query += `
        AND pa.id_professor = ?
      `;

      parametros.push(usuarioId);

    } else {

      query += `
        AND pa.id_aluno = ?
      `;

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

  // =====================================================
  // BUSCAR VÍNCULOS DE UM PROFESSOR
  // =====================================================

  async buscarPorProfessor(
    id_professor: number,
    usuarioId: number,
    tipoUsuario: string,
  ) {

    const pool = this.databaseService.getPool();

    // =====================================================
    // PROFESSOR SÓ PODE VER OS PRÓPRIOS VÍNCULOS
    // =====================================================

    if (
      tipoUsuario === 'professor' &&
      id_professor !== usuarioId
    ) {

      return {
        mensagem:
          'Você só pode consultar seus próprios vínculos',
      };
    }

    // =====================================================
    // ALUNO
    // =====================================================

    if (tipoUsuario === 'aluno') {

      const [vinculos]: any = await pool.query(
        `SELECT
          pa.id_professor_aluno,
          pa.id_professor,
          pa.id_aluno,
          pa.status,

          p.nome,
          p.email,
          p.especialidade,
          p.registro_cref

         FROM professor_aluno pa

         INNER JOIN professor p
           ON p.id_professor = pa.id_professor

         WHERE pa.id_professor = ?
         AND pa.id_aluno = ?`,
        [
          id_professor,
          usuarioId,
        ],
      );

      return vinculos;
    }

    // =====================================================
    // PROFESSOR
    // =====================================================

    const [vinculos]: any = await pool.query(
      `SELECT
        pa.id_professor_aluno,
        pa.id_professor,
        pa.id_aluno,
        pa.status,

        a.nome AS nome_aluno,
        a.email AS email_aluno

       FROM professor_aluno pa

       INNER JOIN aluno a
         ON a.id_aluno = pa.id_aluno

       WHERE pa.id_professor = ?

       ORDER BY pa.id_professor_aluno DESC`,
      [id_professor],
    );

    return vinculos;
  }

  // =====================================================
  // BUSCAR VÍNCULO DE UM ALUNO
  // =====================================================

  async buscarPorAluno(
    id_aluno: number,
    usuarioId: number,
    tipoUsuario: string,
  ) {

    const pool = this.databaseService.getPool();

    // =====================================================
    // ALUNO SÓ PODE CONSULTAR O PRÓPRIO VÍNCULO
    // =====================================================

    if (
      tipoUsuario === 'aluno' &&
      id_aluno !== usuarioId
    ) {

      return {
        mensagem:
          'Você só pode consultar seus próprios vínculos',
      };
    }

    // =====================================================
    // PROFESSOR
    // =====================================================

    if (tipoUsuario === 'professor') {

      const [vinculos]: any = await pool.query(
        `SELECT
          pa.id_professor_aluno,
          pa.id_professor,
          pa.id_aluno,
          pa.status,

          a.nome AS nome_aluno,
          a.email AS email_aluno

         FROM professor_aluno pa

         INNER JOIN aluno a
           ON a.id_aluno = pa.id_aluno

         WHERE pa.id_aluno = ?
         AND pa.id_professor = ?

         ORDER BY pa.id_professor_aluno DESC`,
        [
          id_aluno,
          usuarioId,
        ],
      );

      return vinculos;
    }

    // =====================================================
    // ALUNO
    // =====================================================

    const [vinculos]: any = await pool.query(
      `SELECT
        pa.id_professor_aluno,
        pa.id_professor,
        pa.id_aluno,
        pa.status,

        p.nome,
        p.email,
        p.especialidade,
        p.curriculo,
        p.registro_cref,
        p.bacharelado,
        p.formacao_academica,
        p.registro_cref

       FROM professor_aluno pa

       INNER JOIN professor p
         ON p.id_professor = pa.id_professor

       WHERE pa.id_aluno = ?
       AND pa.status = 'Ativo'

       ORDER BY pa.id_professor_aluno DESC`,
      [id_aluno],
    );

    return vinculos;
  }
}