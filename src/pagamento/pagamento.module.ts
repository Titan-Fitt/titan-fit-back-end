import { Module } from '@nestjs/common';
import { PagamentoController } from './pagamento.controller';
import { PagamentoService } from './pagamento.service';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [PagamentoController],
  providers: [PagamentoService],
})
export class PagamentoModule {}
