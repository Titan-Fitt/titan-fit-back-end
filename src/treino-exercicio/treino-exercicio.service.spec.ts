import { Test, TestingModule } from '@nestjs/testing';
import { TreinoExercicioService } from './treino-exercicio.service';

describe('TreinoExercicioService', () => {
  let service: TreinoExercicioService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TreinoExercicioService],
    }).compile();

    service = module.get<TreinoExercicioService>(TreinoExercicioService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
