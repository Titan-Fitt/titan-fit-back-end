import { Injectable } from '@nestjs/common';

export interface Pagamento {

  id_pagamento: number;

  valor: number;

  data_pagamento: string;

  forma_pagamento: string;

  status: string;

  id_aluno_plano: number;

}

@Injectable()

export class PagamentoService {

  private pagamentos: Pagamento[] = [];

  cadastrar(dados: CreatePagamentoDados) {

    const novoPagamento: Pagamento = {

      id_pagamento: this.pagamentos.length + 1,

      valor: dados.valor,

      data_pagamento: dados.data_pagamento,

      forma_pagamento: dados.forma_pagamento,

      status: dados.status,

      id_aluno_plano: dados.id_aluno_plano

    };

    this.pagamentos.push(novoPagamento);

    return {

      mensagem: 'Pagamento cadastrado com sucesso',

      pagamento: novoPagamento

    };

  }

  listar() {

    return this.pagamentos;

  }

  buscarPorId(id: number) {

    return this.pagamentos.find(

      pagamento => pagamento.id_pagamento === id

    );

  }

  buscarPorAlunoPlano(id_aluno_plano: number) {

    return this.pagamentos.filter(

      pagamento => pagamento.id_aluno_plano === id_aluno_plano

    );

  }

}

interface CreatePagamentoDados {

  valor: number;

  data_pagamento: string;

  forma_pagamento: string;

  status: string;

  id_aluno_plano: number;

}
 