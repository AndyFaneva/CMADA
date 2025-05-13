import { Test, TestingModule } from '@nestjs/testing';
import { CategorieidService } from './categorieid.service';

describe('CategorieidService', () => {
  let service: CategorieidService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategorieidService],
    }).compile();

    service = module.get<CategorieidService>(CategorieidService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
