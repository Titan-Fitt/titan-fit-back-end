import { Test, TestingModule } from '@nestjs/testing';
import { TreinoExercicioController } from './treino-exercicio.controller';

describe('TreinoExercicioController', () => {
  let controller: TreinoExercicioController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TreinoExercicioController],
    }).compile();

    controller = module.get<TreinoExercicioController>(TreinoExercicioController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
