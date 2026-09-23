import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class AlunoService {
  constructor(
    private readonly databaseService: DatabaseService,
  ) {}

  // =====================================================
  // CADASTRO
  // =====================================================

  async cadastro(dados: any) {
    const pool = this.databaseService.getPool();

    const nome = dados.nome.trim();
    const email = dados.email.trim().toLowerCase();
    const cpf = dados.cpf.replace(/\D/g, '');

    // Verifica se e-mail ou CPF já existem
    const [alunoExiste]: any = await pool.query(
      `
      SELECT id_aluno
      FROM aluno
      WHERE email = ? OR cpf = ?
      `,
      [email, cpf],
    );

    if (alunoExiste.length > 0) {
      return {
        mensagem: 'E-mail ou CPF já cadastrado',
      };
    }

    // Criptografa a senha
    const senhaCriptografada = await bcrypt.hash(
      dados.senha,
      10,
    );

    // Insere no banco
    const [resultado]: any = await pool.query(
      `
      INSERT INTO aluno
      (nome, email, senha, cpf)
      VALUES (?, ?, ?, ?)
      `,
      [
        nome,
        email,
        senhaCriptografada,
        cpf,
      ],
    );

    return {
      mensagem: 'Aluno cadastrado com sucesso',

      aluno: {
        id: resultado.insertId,
        nome: nome,
        email: email,
        cpf: cpf,
      },
    };
  }

  // =====================================================
  // LOGIN
  // =====================================================

  async login(dados: any) {
    const pool = this.databaseService.getPool();

    const email = dados.email.trim().toLowerCase();
    const senha = dados.senha;

    console.log('=================================');
    console.log('LOGIN ALUNO');
    console.log('E-mail recebido:', email);
    console.log('Senha recebida:', senha ? 'SIM' : 'NÃO');
    console.log('=================================');

    const [alunos]: any = await pool.query(
      `
      SELECT
        id_aluno,
        nome,
        email,
        senha,
        cpf,
        data_cadastro
      FROM aluno
      WHERE email = ?
      `,
      [email],
    );

    // E-mail não encontrado
    if (alunos.length === 0) {
      console.log('E-mail não encontrado');

      return {
        mensagem: 'E-mail ou senha incorretos',
      };
    }

    const aluno = alunos[0];

    console.log('Aluno encontrado:', aluno.email);
    console.log(
      'Hash armazenado:',
      aluno.senha,
    );

    // Verifica se existe senha no banco
    if (!aluno.senha) {
      console.log('Aluno não possui senha cadastrada');

      return {
        mensagem: 'E-mail ou senha incorretos',
      };
    }

    // Compara senha digitada com o hash
    const senhaCorreta = await bcrypt.compare(
      senha,
      aluno.senha,
    );

    console.log(
      'Senha correta:',
      senhaCorreta,
    );

    if (!senhaCorreta) {
      return {
        mensagem: 'E-mail ou senha incorretos',
      };
    }

    console.log('LOGIN REALIZADO COM SUCESSO');

    return {
      mensagem: 'Login realizado com sucesso',

      aluno: {
        id: aluno.id_aluno,
        nome: aluno.nome,
        email: aluno.email,
        cpf: aluno.cpf,
        data_cadastro: aluno.data_cadastro,
      },
    };
  }

  // =====================================================
  // LISTAR ALUNOS
  // =====================================================

  async listar() {
    const pool = this.databaseService.getPool();

    const [alunos]: any = await pool.query(
      `
      SELECT
        id_aluno,
        nome,
        email,
        cpf,
        data_cadastro
      FROM aluno
      `,
    );

    return alunos;
  }

  // =====================================================
  // BUSCAR ALUNO POR ID
  // =====================================================

  async buscarPorId(id: number) {
    const pool = this.databaseService.getPool();

    const [alunos]: any = await pool.query(
      `
      SELECT
        id_aluno,
        nome,
        email,
        cpf,
        data_cadastro
      FROM aluno
      WHERE id_aluno = ?
      `,
      [id],
    );

    if (alunos.length === 0) {
      return {
        mensagem: 'Aluno não encontrado',
      };
    }

    return alunos[0];
  }
}