import { Injectable } from '@nestjs/common';
import { SelectQueryBuilder } from 'typeorm';

@Injectable()
export class QueryService<T> {
  /**
   * The underlying query builder instance.
   */
  private query: SelectQueryBuilder<T>;

  private alias: string;

  /**
   * Sets the current query builder instance.
   * @param {SelectQueryBuilder<T>} query - The query builder instance.
   * @returns {this} The current instance of QueryService.
   */
  on(query: SelectQueryBuilder<T>): this {
    this.query = query;
    this.alias = query.alias;
    return this;
  }

  /**
   * Applies pagination to the query.
   * @param {number} page - The page number.
   * @param {number} limit - The number of items per page.
   * @returns {this} The current instance of QueryService.
   */
  applyPagination(page: number, limit: number): this {
    const offset = page * limit;
    this.query.skip(offset).take(limit);
    return this;
  }

  /**
   * Applies sorting to the query based on given fields and orders.
   * @param {{ field: string; order: 'ASC' | 'DESC' }[]} sort - The array of sorting criteria.
   * @returns {this} The current instance of QueryService.
   */
  applySorting(sort: { field: string; order: 'ASC' | 'DESC' }[]): this {
    sort.forEach(({ field, order }) => {
      this.query.addOrderBy(`${this.alias}.${field}`, order);
    });
    return this;
  }

  /**
   * Applies filters to the query based on given filter criteria.
   * @param {{ field: string; value: any; operator: string }[]} filters - The array of filter criteria.
   * @returns {this} The current instance of QueryService.
   */
  applyFilters(
    filters: { field: string; value: any; operator: string }[],
  ): this {
    filters.forEach(({ field, value, operator }) => {
      switch (operator) {
        case 'equals':
          this.query.andWhere(`${this.alias}.${field} = :value`, { value });
          break;
        case 'not':
          this.query.andWhere(`${this.alias}.${field} != :value`, { value });
          break;
        case 'gt':
          this.query.andWhere(`${this.alias}.${field} > :value`, { value });
          break;
        case 'gte':
          this.query.andWhere(`${this.alias}.${field} >= :value`, { value });
          break;
        case 'lt':
          this.query.andWhere(`${this.alias}.${field} < :value`, { value });
          break;
        case 'lte':
          this.query.andWhere(`${this.alias}.${field} <= :value`, { value });
          break;
        case 'like':
          this.query.andWhere(`${this.alias}.${field} LIKE :value`, {
            value: `%${value}%`,
          });
          break;
        case 'in':
          this.query.andWhere(`${this.alias}.${field} IN (:...value)`, {
            value,
          });
          break;
        case 'notIn':
          this.query.andWhere(`${this.alias}.${field} NOT IN (:...value)`, {
            value,
          });
          break;
        case 'isNull':
          this.query.andWhere(`${this.alias}.${field} IS NULL`);
          break;
        case 'isNotNull':
          this.query.andWhere(`${this.alias}.${field} IS NOT NULL`);
          break;
      }
    });
    return this;
  }

  /**
   * Executes the query and retrieves multiple results.
   * @returns {Promise<T[]>} A promise that resolves to an array of query results.
   */
  async getMany(): Promise<T[]> {
    return this.query.getMany();
  }

  /**
   * Executes the query and retrieves a single result.
   * @returns {Promise<T>} A promise that resolves to a single query result.
   */
  async getOne(): Promise<T> {
    return this.query.getOne();
  }

  /**
   * Returns the underlying SelectQueryBuilder instance.
   * @returns {SelectQueryBuilder<T>} The SelectQueryBuilder instance.
   */
  getQuery(): SelectQueryBuilder<T> {
    return this.query;
  }
}
