import { Test, TestingModule } from '@nestjs/testing';
import { ProfessorAlunoService } from './professor-aluno.service';

describe('ProfessorAlunoService', () => {
  let service: ProfessorAlunoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProfessorAlunoService],
    }).compile();

    service = module.get<ProfessorAlunoService>(ProfessorAlunoService);
  });


  

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
