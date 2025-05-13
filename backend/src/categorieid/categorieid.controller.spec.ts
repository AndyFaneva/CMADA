import { Test, TestingModule } from '@nestjs/testing';
import { CategorieidController } from './categorieid.controller';

describe('CategorieidController', () => {
  let controller: CategorieidController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategorieidController],
    }).compile();

    controller = module.get<CategorieidController>(CategorieidController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
