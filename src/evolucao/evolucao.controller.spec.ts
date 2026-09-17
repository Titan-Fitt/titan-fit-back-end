import { Test, TestingModule } from '@nestjs/testing';
import { EvolucaoController } from './evolucao.controller';

describe('EvolucaoController', () => {
  let controller: EvolucaoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EvolucaoController],
    }).compile();

    controller = module.get<EvolucaoController>(EvolucaoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
