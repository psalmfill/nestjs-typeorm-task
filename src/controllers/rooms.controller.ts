import { RoomsService } from '../services/rooms.service';
import { Controller, Get, Query } from '@nestjs/common';

@Controller('api/rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  /**
   * Get a list of rooms with pagination, filtering, and sorting options.
   *
   * @param {number} page - The page number for pagination (default is 0).
   * @param {number} limit - The number of items per page (default is 10).
   * @param {string} filters - A JSON string representing the filters to be applied.
   * @param {string} sort - A JSON string representing the sorting options.
   * @returns {Promise<any[]>} - A promise that resolves to an array of rooms.
   */
  @Get()
  async getRooms(
    @Query('page') page: number = 0,
    @Query('limit') limit: number = 10,
    @Query('filters') filters: string = '[]',
    @Query('sort') sort: string = '[]',
  ) {
    const filtersParsed = JSON.parse(filters);
    const sortParsed = JSON.parse(sort);
    return this.roomsService.findRooms(page, limit, filtersParsed, sortParsed);
  }
}
