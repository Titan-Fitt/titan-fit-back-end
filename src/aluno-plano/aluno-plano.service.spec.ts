import { Test, TestingModule } from '@nestjs/testing';
import { AlunoPlanoService } from './aluno-plano.service';

describe('AlunoPlanoService', () => {
  let service: AlunoPlanoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AlunoPlanoService],
    }).compile();

    service = module.get<AlunoPlanoService>(AlunoPlanoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
