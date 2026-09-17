import { Test, TestingModule } from '@nestjs/testing';
import { ExercicioController } from './exercicio.controller';

describe('ExercicioController', () => {
  let controller: ExercicioController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExercicioController],
    }).compile();

    controller = module.get<ExercicioController>(ExercicioController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
