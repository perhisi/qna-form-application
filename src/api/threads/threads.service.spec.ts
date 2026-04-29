import { Test, TestingModule } from '@nestjs/testing';
import { ThreadsService } from './threads.service';
import { ThreadsRepository } from './threads.repository';

describe('ThreadsService', () => {
  let service: ThreadsService;

  beforeEach(async () => {
    const mockRepo = {
      create: jest.fn(),
      findAll: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
    } as any;

    const module: TestingModule = await Test.createTestingModule({
      providers: [ThreadsService, { provide: ThreadsRepository, useValue: mockRepo }],
    }).compile();

    service = module.get<ThreadsService>(ThreadsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
