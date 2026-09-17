import { Test, TestingModule } from '@nestjs/testing';
import { FichaAlunoController } from './ficha-aluno.controller';

describe('FichaAlunoController', () => {
  let controller: FichaAlunoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FichaAlunoController],
    }).compile();

    controller = module.get<FichaAlunoController>(FichaAlunoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
