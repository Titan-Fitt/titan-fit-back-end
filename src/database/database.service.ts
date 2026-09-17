import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createPool, Pool } from 'mysql2/promise';
@Injectable()
export class DatabaseService {

    private readonly pool: Pool;
    constructor(private readonly configservice: ConfigService) {
        this.pool = createPool({
            host: this.configservice.get<string>('DB_HOST'),
            port: Number(this.configservice.get<string>('DB_PORT')),
            user: this.configservice.get<string>('DB_USER'),
            password: this.configservice.get<string>('DB_PASSAWORD'),
            database: this.configservice.get<string>('DB_NAME')
        })
}

async query(sql: string, valores:any[] = []){
      const [resultado] = await this.pool.execute(sql, valores);

      return resultado;
}
}
