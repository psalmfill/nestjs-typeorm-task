import { QueryService } from './../type-orm-utilities/query.service';
import { Room } from './../entities/room.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(Room)
    private readonly roomRepository: Repository<Room>,
    private readonly queryService: QueryService<Room>,
  ) {}

  /**
   * Finds rooms with pagination, filtering, and sorting.
   * 
   * @param {number} page - The page number for pagination.
   * @param {number} limit - The number of items per page.
   * @param {any[]} filters - An array of filters to apply to the query.
   * @param {any[]} sort - An array of sorting options.
   * @returns {Promise<Room[]>} - A promise that resolves to an array of rooms.
   */
  async findRooms(page: number, limit: number, filters: any[], sort: any[]): Promise<Room[]> {
    const query = this.roomRepository.createQueryBuilder('room');

    const results = await this.queryService
      .on(query)
      .applyFilters(filters)
      .applySorting(sort)
      .applyPagination(page, limit)
      .getMany();

    return results;
  }

  /**
   * Finds a single room by its ID.
   * 
   * @param {number} id - The ID of the room to find.
   * @returns {Promise<Room | undefined>} - A promise that resolves to the found room, or undefined if no room was found.
   */
  async findOneRoom(id: number): Promise<Room | undefined> {
    const query = this.roomRepository
      .createQueryBuilder('room')
      .where('room.id = :id', { id });

    const result = await this.queryService.on(query).getOne();

    return result;
  }

  /**
   * Seeds the database with initial room data.
   * 
   * @returns {Promise<void>} - A promise that resolves when the seeding is complete.
   */
  async seed(): Promise<void> {
    const rooms = [
      { id: 1, name: "Conference Room A", capacity: 10, userId: 1 },
      { id: 2, name: "Meeting Room B", capacity: 8, userId: 2 },
      { id: 3, name: "Workshop Room C", capacity: 20, userId: 1 },
      { id: 4, name: "Training Room D", capacity: 15, userId: 3 },
      { id: 5, name: "Seminar Room E", capacity: 25, userId: 2 },
      { id: 6, name: "Discussion Room F", capacity: 5, userId: 4 },
      { id: 7, name: "Board Room G", capacity: 12, userId: 1 },
      { id: 8, name: "Conference Room H", capacity: 10, userId: 3 },
      { id: 9, name: "Small Meeting Room I", capacity: 4, userId: 2 },
      { id: 10, name: "Large Conference Room J", capacity: 30, userId: 4 },
      { id: 11, name: "Project Room K", capacity: 6, userId: 1 },
      { id: 12, name: "Collaboration Room L", capacity: 10, userId: 3 },
      { id: 13, name: "Focus Room M", capacity: 2, userId: 2 },
      { id: 14, name: "Presentation Room N", capacity: 18, userId: 1 },
      { id: 15, name: "Lecture Room O", capacity: 22, userId: 3 },
      { id: 16, name: "Briefing Room P", capacity: 14, userId: 4 },
      { id: 17, name: "Strategy Room Q", capacity: 10, userId: 1 },
      { id: 18, name: "Consultation Room R", capacity: 5, userId: 3 },
      { id: 19, name: "Interview Room S", capacity: 3, userId: 2 },
      { id: 20, name: "Brainstorming Room T", capacity: 12, userId: 4 }
    ];

    await this.roomRepository.save(rooms);
  }
}
