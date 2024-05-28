import { Test, TestingModule } from '@nestjs/testing';
import { QueryService } from './query.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Room } from '../entities/room.entity'; // Adjust the import according to your directory structure

describe('QueryService', () => {
  let service: QueryService<Room>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        QueryService,
        {
          provide: getRepositoryToken(Room),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<QueryService<Room>>(QueryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
