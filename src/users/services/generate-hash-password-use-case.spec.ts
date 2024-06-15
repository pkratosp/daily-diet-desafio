import { Test, TestingModule } from '@nestjs/testing';
import { GenerateHashPasswordUseCase } from './generate-hash-password-use-case';

describe('GenerateHashPasswordUseCase', () => {
  let service: GenerateHashPasswordUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GenerateHashPasswordUseCase],
    }).compile();

    service = module.get<GenerateHashPasswordUseCase>(GenerateHashPasswordUseCase);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it.todo('should generate hash password')
});
