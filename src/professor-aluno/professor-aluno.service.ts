import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class ProfessorAlunoService {

  constructor(
    private readonly databaseService: DatabaseService,
  ) {}

  // =====================================================
  // CRIAR SOLICITAÇÃO DE CONEXÃO
  // =====================================================

  async cadastrar(
    dados: any,
    usuarioLogadoId: number,
    tipoUsuario: string,
  ) {

    const pool = this.databaseService.getPool();

    // =====================================================
    // SOMENTE ALUNO PODE SOLICITAR CONEXÃO
    // =====================================================

    if (tipoUsuario !== 'aluno') {
      return {
        mensagem: 'Apenas alunos podem solicitar conexão com professores',
      };
    }

    // =====================================================
    // VERIFICAR PROFESSOR
    // =====================================================

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

    // =====================================================
    // VERIFICAR ALUNO LOGADO
    // =====================================================

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

    // =====================================================
    // VERIFICAR SE JÁ POSSUI PROFESSOR
    // =====================================================

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

    // =====================================================
    // VERIFICAR SOLICITAÇÃO PENDENTE
    // =====================================================

    const [solicitacaoPendente]: any = await pool.query(
      `SELECT id_solicitacao
       FROM solicitacao_conexao
       WHERE id_aluno = ?
       AND id_professor = ?
       AND status = 'Pendente'`,
      [
        usuarioLogadoId,
        dados.id_professor,
      ],
    );

    if (solicitacaoPendente.length > 0) {
      return {
        mensagem: 'Você já enviou uma solicitação para esse professor',
      };
    }

    // =====================================================
    // VERIFICAR SE JÁ EXISTE SOLICITAÇÃO ACEITA
    // =====================================================

    const [solicitacaoAceita]: any = await pool.query(
      `SELECT id_solicitacao
       FROM solicitacao_conexao
       WHERE id_aluno = ?
       AND id_professor = ?
       AND status = 'Aceita'`,
      [
        usuarioLogadoId,
        dados.id_professor,
      ],
    );

    if (solicitacaoAceita.length > 0) {
      return {
        mensagem: 'Essa solicitação já foi aceita',
      };
    }

    // =====================================================
    // CRIAR SOLICITAÇÃO
    // =====================================================

    const [resultado]: any = await pool.query(
      `INSERT INTO solicitacao_conexao
      (
        id_aluno,
        id_professor,
        status
      )
      VALUES (?, ?, 'Pendente')`,
      [
        usuarioLogadoId,
        dados.id_professor,
      ],
    );

    return {
      mensagem: 'Solicitação enviada com sucesso',
      solicitacao: {
        id_solicitacao: resultado.insertId,
        id_aluno: usuarioLogadoId,
        id_professor: dados.id_professor,
        status: 'Pendente',
      },
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
  // LISTAR SOLICITAÇÕES PENDENTES DO PROFESSOR
  // =====================================================

  async listarSolicitacoes(
    usuarioId: number,
    tipoUsuario: string,
  ) {

    const pool = this.databaseService.getPool();

    // =====================================================
    // SOMENTE PROFESSOR PODE VER SOLICITAÇÕES
    // =====================================================

    if (tipoUsuario !== 'professor') {
      return {
        mensagem: 'Apenas professores podem visualizar solicitações',
      };
    }

    const [solicitacoes]: any = await pool.query(
      `SELECT
        sc.id_solicitacao,
        sc.id_aluno,
        sc.id_professor,
        sc.status,
        sc.data_solicitacao,

        a.nome AS nome_aluno,
        a.email AS email_aluno

       FROM solicitacao_conexao sc

       INNER JOIN aluno a
         ON a.id_aluno = sc.id_aluno

       WHERE sc.id_professor = ?
       AND sc.status = 'Pendente'

       ORDER BY sc.data_solicitacao DESC`,
      [usuarioId],
    );

    return solicitacoes;
  }


  // =====================================================
  // ACEITAR SOLICITAÇÃO
  // =====================================================

  async aceitarSolicitacao(
    idSolicitacao: number,
    usuarioId: number,
    tipoUsuario: string,
  ) {

    const pool = this.databaseService.getPool();

    // =====================================================
    // SOMENTE PROFESSOR PODE ACEITAR
    // =====================================================

    if (tipoUsuario !== 'professor') {
      return {
        mensagem: 'Apenas professores podem aceitar solicitações',
      };
    }

    // =====================================================
    // BUSCAR SOLICITAÇÃO
    // =====================================================

    const [solicitacoes]: any = await pool.query(
      `SELECT
        id_solicitacao,
        id_aluno,
        id_professor,
        status

       FROM solicitacao_conexao

       WHERE id_solicitacao = ?
       AND id_professor = ?`,
      [
        idSolicitacao,
        usuarioId,
      ],
    );

    if (solicitacoes.length === 0) {
      return {
        mensagem: 'Solicitação não encontrada',
      };
    }

    const solicitacao = solicitacoes[0];

    // =====================================================
    // VERIFICAR STATUS
    // =====================================================

    if (solicitacao.status !== 'Pendente') {
      return {
        mensagem: 'Essa solicitação já foi respondida',
      };
    }

    // =====================================================
    // VERIFICAR SE ALUNO JÁ POSSUI PROFESSOR
    // =====================================================

    const [vinculoExistente]: any = await pool.query(
      `SELECT id_professor_aluno
       FROM professor_aluno
       WHERE id_aluno = ?
       AND status = 'Ativo'`,
      [solicitacao.id_aluno],
    );

    if (vinculoExistente.length > 0) {
      return {
        mensagem: 'Esse aluno já está conectado a um professor',
      };
    }

    // =====================================================
    // CRIAR VÍNCULO
    // =====================================================

    await pool.query(
      `INSERT INTO professor_aluno
      (
        id_professor,
        id_aluno,
        data_vinculo,
        status
      )
      VALUES (?, ?, CURDATE(), 'Ativo')`,
      [
        usuarioId,
        solicitacao.id_aluno,
      ],
    );

    // =====================================================
    // ATUALIZAR SOLICITAÇÃO
    // =====================================================

    await pool.query(
      `UPDATE solicitacao_conexao
       SET
         status = 'Aceita',
         data_resposta = NOW()
       WHERE id_solicitacao = ?`,
      [idSolicitacao],
    );

    return {
      mensagem: 'Solicitação aceita com sucesso',
    };
  }


  // =====================================================
  // RECUSAR SOLICITAÇÃO
  // =====================================================

  async recusarSolicitacao(
    idSolicitacao: number,
    usuarioId: number,
    tipoUsuario: string,
  ) {

    const pool = this.databaseService.getPool();

    // =====================================================
    // SOMENTE PROFESSOR PODE RECUSAR
    // =====================================================

    if (tipoUsuario !== 'professor') {
      return {
        mensagem: 'Apenas professores podem recusar solicitações',
      };
    }

    // =====================================================
    // VERIFICAR SOLICITAÇÃO
    // =====================================================

    const [solicitacoes]: any = await pool.query(
      `SELECT id_solicitacao
       FROM solicitacao_conexao
       WHERE id_solicitacao = ?
       AND id_professor = ?
       AND status = 'Pendente'`,
      [
        idSolicitacao,
        usuarioId,
      ],
    );

    if (solicitacoes.length === 0) {
      return {
        mensagem: 'Solicitação não encontrada ou já respondida',
      };
    }

    // =====================================================
    // RECUSAR SOLICITAÇÃO
    // =====================================================

    await pool.query(
      `UPDATE solicitacao_conexao
       SET
         status = 'Recusada',
         data_resposta = NOW()
       WHERE id_solicitacao = ?`,
      [idSolicitacao],
    );

    return {
      mensagem: 'Solicitação recusada com sucesso',
    };
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
        p.formacao_academica

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