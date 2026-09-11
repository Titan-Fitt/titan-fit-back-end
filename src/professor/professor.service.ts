import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

interface Professor {
  id: number;
  nome: string;
  email: string;
  senha: string;
  telefone: string;
  cpf: string;
  crf: string;

}

@Injectable()
export class ProfessorService {
  private professores: Professor[] = [];
  async cadastro(dados: any) {

    const professorExiste = this.professores.find(
      professor => professor.email === dados.email
    );

    if (professorExiste) {
      return {
        mensagem: 'E-mail já cadastrado'
      };
    }

    const senhaCriptografada = await bcrypt.hash(dados.senha, 10);

    const novoProfessor: Professor = {
      id: this.professores.length + 1,
      nome: dados.nome,
      email: dados.email,
      senha: senhaCriptografada,
      telefone: dados.telefone,
      cpf: dados.cpf,
      crf: dados.crf
    };

    this.professores.push(novoProfessor);
    return {
      mensagem: 'Professor cadastrado com sucesso',

      professor: {
        id: novoProfessor.id,
        nome: novoProfessor.nome,
        email: novoProfessor.email,
        telefone: novoProfessor.telefone,
        cpf: novoProfessor.cpf,
        crf: novoProfessor.crf
      }
    };
  }

  async login(dados: any) {
    const professor = this.professores.find(
      professor => professor.email === dados.email
    );

    if (!professor) {
      return {
        mensagem: 'E-mail ou senha incorretos'
      };
    }

    const senhaCorreta = await bcrypt.compare(
      dados.senha,
      professor.senha
    );

    if (!senhaCorreta) {

      return {
        mensagem: 'E-mail ou senha incorretos'
      };
    }

    return {
      mensagem: 'Login realizado com sucesso',
      professor: {
        id: professor.id,
        nome: professor.nome,
        email: professor.email,
        telefone: professor.telefone,
        cpf: professor.cpf,
        crf: professor.crf
      }
    };
  }

  listar() {
    return this.professores.map(professor => ({
      id: professor.id,
      nome: professor.nome,
      email: professor.email,
      telefone: professor.telefone,
      cpf: professor.cpf,
      crf: professor.crf
    }));
  }
}
