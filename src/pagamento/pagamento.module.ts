import { Module } from '@nestjs/common';

import { PagamentoController } from './pagamento.controller';
import { PagamentoService } from './pagamento.service';
import { DatabaseModule } from '../database/database.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
  ],
  controllers: [PagamentoController],
  providers: [PagamentoService],
})
export class PagamentoModule {}
