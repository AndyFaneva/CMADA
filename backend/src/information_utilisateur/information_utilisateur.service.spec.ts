import { Test, TestingModule } from '@nestjs/testing';
import { InformationUtilisateurService } from './information_utilisateur.service';

describe('InformationUtilisateurService', () => {
  let service: InformationUtilisateurService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InformationUtilisateurService],
    }).compile();

    service = module.get<InformationUtilisateurService>(InformationUtilisateurService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
