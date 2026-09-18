import { Test, TestingModule } from '@nestjs/testing';
import { AlunoPlanoController } from './aluno-plano.controller';

describe('AlunoPlanoController', () => {
  let controller: AlunoPlanoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AlunoPlanoController],
    }).compile();

    controller = module.get<AlunoPlanoController>(AlunoPlanoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
