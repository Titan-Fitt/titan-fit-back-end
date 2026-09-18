import { Injectable } from '@nestjs/common';

export interface ProfessorAluno {
  id_professor_aluno: number;
  id_professor: number;
  id_aluno: number;
  data_vinculo: Date;
  status: string;
}

@Injectable()
export class ProfessorAlunoService {
  private professorAlunos: ProfessorAluno[] = [];

  cadastrar(dados: CreateProfessorAlunoDados) {
    const vinculoExiste = this.professorAlunos.find(
      item =>
        item.id_professor === dados.id_professor &&
        item.id_aluno === dados.id_aluno
    );

    if (vinculoExiste) {
      return {
        mensagem: 'Esse professor já está vinculado a esse aluno'
      };
    }

    const novoVinculo: ProfessorAluno = {
      id_professor_aluno: this.professorAlunos.length + 1,
      id_professor: dados.id_professor,
      id_aluno: dados.id_aluno,
      data_vinculo: new Date(),
      status: dados.status
    };

    this.professorAlunos.push(novoVinculo);

    return {
      mensagem: 'Professor vinculado ao aluno com sucesso',
      professorAluno: novoVinculo
    };
  }

  listar() {
    return this.professorAlunos;
  }

  buscarPorId(id: number) {
    return this.professorAlunos.find(
      item => item.id_professor_aluno === id
    );
  }

  buscarPorProfessor(id_professor: number) {
    return this.professorAlunos.filter(
      item => item.id_professor === id_professor
    );
  }

  buscarPorAluno(id_aluno: number) {
    return this.professorAlunos.filter(
      item => item.id_aluno === id_aluno
    );
  }
}

interface CreateProfessorAlunoDados {
  id_professor: number;
  id_aluno: number;
  status: string;
}
