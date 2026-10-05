import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { randomBytes, createHash } from 'crypto';
import * as bcrypt from 'bcrypt'
import { EmailService } from './email.service';
import { DatabaseService } from '../database/database.service';
@Injectable()
export class AuthService {
  constructor(
  private readonly jwtService: JwtService,
  private readonly databaseService: DatabaseService,
  private readonly emailService: EmailService,
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

  async solicitarRecuperacao(email: string, tipoUsuario: string) {
    const pool = this.databaseService.getPool();
      if (tipoUsuario !== 'aluno' && tipoUsuario !== 'professor') {
     return {
        mensagem: 'Tipo de usuário inválido',
      };
    }

  const tabela = tipoUsuario === 'aluno' ? 'aluno' : 'professor';
    const campoId = tipoUsuario === 'aluno' ? 'id_aluno' : 'id_professor';

      const [usuarios]: any = await pool.query(
      `SELECT ${campoId} FROM ${tabela} WHERE email = ?`,
      [email],
    );

    if (usuarios.length === 0) {
      return {
        mensagem: 'E-mail não encontrado',
      };
    }

  const token = randomBytes(32).toString('hex');
    const tokenHash = createHash('sha256')
    .update(token)
      .digest('hex');

    const expiracao = new Date(Date.now() + 30 * 60 * 1000);
await pool.query(
  `INSERT INTO recuperacao_senha (email, tipo_usuario, token_hash, expiracao)
   VALUES (?, ?, ?, ?)`,
  [email, tipoUsuario, tokenHash, expiracao],
);
await this.emailService.enviarTokenRecuperacao(
  email,
  token,
);
return {
  mensagem: 'Token de recuperação enviado para o e-mail',
};
}

  async redefinirSenha(token: string, novaSenha: string) {
    const pool = this.databaseService.getPool();

    const tokenHash = createHash('sha256')
    .update(token)
    .digest('hex');

  const [recuperacoes]: any = await pool.query(
    `SELECT *
     FROM recuperacao_senha
     WHERE token_hash = ?
     AND usado = FALSE
     AND expiracao > NOW()
     ORDER BY id_recuperacao DESC
     LIMIT 1`,
    [tokenHash],
  );

  if (recuperacoes.length === 0) {
    return {
      mensagem: 'Token inválido, expirado ou já utilizado',
    };

  }
  const recuperacao = recuperacoes[0];

    const senhaCriptografada = await bcrypt.hash(
    novaSenha,
    10,
  );

  if (recuperacao.tipo_usuario === 'aluno') {
    await pool.query(
      `UPDATE aluno
       SET senha = ?
       WHERE email = ?`,
      [senhaCriptografada, recuperacao.email],
    );

  } else {
    await pool.query(
      `UPDATE professor
       SET senha = ?
       WHERE email = ?`,
      [senhaCriptografada, recuperacao.email],
    );

  }
  await pool.query(
    `UPDATE recuperacao_senha
     SET usado = TRUE
     WHERE id_recuperacao = ?`,
    [recuperacao.id_recuperacao],
  );

  return {
    mensagem: 'Senha redefinida com sucesso',
  };

}
}
