import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class ProfessorAlunoService {
  constructor(
    private readonly databaseService: DatabaseService
  ) {}

  async cadastrar(dados: any) {
    const pool = this.databaseService.getPool();

    const [professores]: any = await pool.query(
      `SELECT id_professor
       FROM professor
       WHERE id_professor = ?`,
      [dados.id_professor]
    );

    if (professores.length === 0) {
      return {
        mensagem: 'Professor não encontrado'
      };
    }

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

    const [vinculoExiste]: any = await pool.query(
      `SELECT id_professor_aluno
       FROM professor_aluno
       WHERE id_professor = ?
       AND id_aluno = ?`,
      [dados.id_professor, dados.id_aluno]
    );

    if (vinculoExiste.length > 0) {
      return {
        mensagem: 'Esse professor já está vinculado a esse aluno'
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
        dados.status
      ]
    );

    const [vinculos]: any = await pool.query(
      `SELECT *
       FROM professor_aluno
       WHERE id_professor_aluno = ?`,
      [resultado.insertId]
    );

    return {
      mensagem: 'Professor vinculado ao aluno com sucesso',
      professorAluno: vinculos[0]
    };
  }

  async listar() {
    const pool = this.databaseService.getPool();

    const [vinculos]: any = await pool.query(
      `SELECT *
       FROM professor_aluno`
    );

    return vinculos;
  }

  async buscarPorId(id: number) {
    const pool = this.databaseService.getPool();

    const [vinculos]: any = await pool.query(
      `SELECT *
       FROM professor_aluno
       WHERE id_professor_aluno = ?`,
      [id]
    );

    if (vinculos.length === 0) {
      return {
        mensagem: 'Vínculo não encontrado'
      };
    }

    return vinculos[0];
  }

  async buscarPorProfessor(id_professor: number) {
    const pool = this.databaseService.getPool();

    const [vinculos]: any = await pool.query(
      `SELECT *
       FROM professor_aluno
       WHERE id_professor = ?`,
      [id_professor]
    );

    return vinculos;
  }

  async buscarPorAluno(id_aluno: number) {
    const pool = this.databaseService.getPool();

    const [vinculos]: any = await pool.query(
      `SELECT *
       FROM professor_aluno
       WHERE id_aluno = ?`,
      [id_aluno]
    );

    return vinculos;
  }
}
