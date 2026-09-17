import { Test, TestingModule } from '@nestjs/testing';
import { FichaAlunoService } from './ficha-aluno.service';

describe('FichaAlunoService', () => {
  let service: FichaAlunoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FichaAlunoService],
    }).compile();

    service = module.get<FichaAlunoService>(FichaAlunoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
