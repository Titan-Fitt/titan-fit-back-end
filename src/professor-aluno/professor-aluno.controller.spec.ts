import { Test, TestingModule } from '@nestjs/testing';
import { ProfessorAlunoController } from './professor-aluno.controller';

describe('ProfessorAlunoController', () => {
  let controller: ProfessorAlunoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProfessorAlunoController],
    }).compile();

    controller = module.get<ProfessorAlunoController>(ProfessorAlunoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
