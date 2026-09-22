import { Injectable } from '@nestjs/common';

import { DatabaseService } from '../database/database.service';

@Injectable()

export class FichaAlunoService {

  constructor(

    private readonly databaseService: DatabaseService

  ) {}

  async cadastrar(dados: any) {

    const pool = this.databaseService.getPool();

    const [aluno]: any = await pool.query(

      `SELECT id_aluno

       FROM aluno

       WHERE id_aluno = ?`,

      [dados.id_aluno]

    );

    if (aluno.length === 0) {

      return {

        mensagem: 'Aluno não encontrado'

      };

    }

    const [fichaExiste]: any = await pool.query(

      `SELECT id_ficha

       FROM ficha_aluno

       WHERE id_aluno = ?`,

      [dados.id_aluno]

    );

    if (fichaExiste.length > 0) {

      return {

        mensagem: 'Esse aluno já possui uma ficha'

      };

    }

    const objetivos = [

      'Funcional',

      'Hipertrofia',

      'Força máxima',

      'Resistência muscular'

    ];

    if (!objetivos.includes(dados.objetivo)) {

      return {

        mensagem: 'Objetivo inválido'

      };

    }

    const [resultado]: any = await pool.query(

      `INSERT INTO ficha_aluno

      (

        idade,

        peso,

        altura,

        objetivo,

        id_aluno

      )

      VALUES (?, ?, ?, ?, ?)`,

      [

        dados.idade,

        dados.peso,

        dados.altura,

        dados.objetivo,

        dados.id_aluno

      ]

    );

    const [ficha]: any = await pool.query(

      `SELECT *

       FROM ficha_aluno

       WHERE id_ficha = ?`,

      [resultado.insertId]

    );

    return {

      mensagem: 'Ficha cadastrada com sucesso',

      ficha: ficha[0]

    };

  }

  async listar() {

    const pool = this.databaseService.getPool();

    const [fichas]: any = await pool.query(

      `SELECT *

       FROM ficha_aluno`

    );

    return fichas;

  }

  async buscarPorAluno(id_aluno: number) {

    const pool = this.databaseService.getPool();

    const [fichas]: any = await pool.query(

      `SELECT *

       FROM ficha_aluno

       WHERE id_aluno = ?`,

      [id_aluno]

    );

    if (fichas.length === 0) {

      return {

        mensagem: 'Ficha não encontrada'

      };

    }

    return fichas[0];

  }

  async atualizar(id_aluno: number, dados: any) {

    const pool = this.databaseService.getPool();

    const objetivos = [

      'Funcional',

      'Hipertrofia',

      'Força máxima',

      'Resistência muscular'

    ];

    if (!objetivos.includes(dados.objetivo)) {

      return {

        mensagem: 'Objetivo inválido'

      };

    }

    const [resultado]: any = await pool.query(

      `UPDATE ficha_aluno

       SET idade = ?,

           peso = ?,

           altura = ?,

           objetivo = ?

       WHERE id_aluno = ?`,

      [

        dados.idade,

        dados.peso,

        dados.altura,

        dados.objetivo,

        id_aluno

      ]

    );

    if (resultado.affectedRows === 0) {

      return {

        mensagem: 'Ficha não encontrada'

      };

    }

    const [ficha]: any = await pool.query(

      `SELECT *

       FROM ficha_aluno

       WHERE id_aluno = ?`,

      [id_aluno]

    );

    return {

      mensagem: 'Ficha atualizada com sucesso',

      ficha: ficha[0]

    };

  }

}
 