import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly databaseService: DatabaseService,
  ) {}

  async loginAluno(email: string, senha: string) {
    const pool = this.databaseService.getPool();

    const [alunos]: any = await pool.query(
      `SELECT * FROM aluno WHERE email = ?`,
      [email],
    );

    if (alunos.length === 0) {
      return {
        mensagem: 'E-mail ou senha inválidos',
      };
    }

    const aluno = alunos[0];

    const senhaCorreta = await bcrypt.compare(senha, aluno.senha);

    if (!senhaCorreta) {
      return {
        mensagem: 'E-mail ou senha inválidos',
      };
    }

    const token = this.jwtService.sign({
      id: aluno.id_aluno,
      email: aluno.email,
      tipo: 'aluno',
    });

    return {
      mensagem: 'Login realizado com sucesso',
      token,
      aluno: {
        id: aluno.id_aluno,
        nome: aluno.nome,
        email: aluno.email,
      },
    };
  }

  async loginProfessor(email: string, senha: string) {
    const pool = this.databaseService.getPool();

    const [professores]: any = await pool.query(
      `SELECT * FROM professor WHERE email = ?`,
      [email],
    );

    if (professores.length === 0) {
      return {
        mensagem: 'E-mail ou senha inválidos',
      };
    }

    const professor = professores[0];

    const senhaCorreta = await bcrypt.compare(senha, professor.senha);

    if (!senhaCorreta) {
      return {
        mensagem: 'E-mail ou senha inválidos',
      };
    }

    const token = this.jwtService.sign({
      id: professor.id_professor,
      email: professor.email,
      tipo: 'professor',
    });

    return {
      mensagem: 'Login realizado com sucesso',
      token,
      professor: {
        id: professor.id_professor,
        nome: professor.nome,
        email: professor.email,
      },
    };
  }
}
