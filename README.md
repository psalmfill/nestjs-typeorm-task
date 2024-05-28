---
# Project Setup Guide

This guide outlines the steps to set up and run the project after cloning it from GitHub.

## Prerequisites

Before starting, ensure you have the following installed on your system:
- Node.js (v14 or higher)
- npm (Node Package Manager) or yarn
- TypeScript

## Clone the Repository

Clone the repository from GitHub using the following command:

```bash
git clone https://github.com/psalmfill/nestjs-typeorm-task.git
```

## Install Dependencies

Navigate into the project directory:

```bash
cd nestjs-typeorm-task 
```

### Install dependencies using npm:
```bash
npm install
```
### or using yarn:

```bash
yarn install
```

## Seed test data

```bash
npm run data:sync
```


## Running the Application

### Development Mode

To run the application in development mode, use:


```bash
npm run start:dev
```

or

```bash
yarn start:dev
```

This will start the NestJS server with hot-reloading enabled.

### Production Mode

For production deployment, build the project first:

```bash 
npm run build
```
or

```bash
yarn build
```

Then start the server:

```bash
npm start
```

or

```bash
yarn start
```

## Running Tests

To run tests, use:

```bash
npm test
```

or

```bash
yarn test
```

# QueryService Usage

A utility service for building and executing TypeORM queries with pagination, filtering, and sorting options.

## Overview

The `QueryService` class provides a convenient way to construct and execute queries using TypeORM's `SelectQueryBuilder`. It offers methods for applying pagination, filtering, and sorting to queries, allowing for flexible data retrieval from the database.

## Usage

### Initialization

To use the `QueryService`, you first need to instantiate it:

```typescript
import { QueryService } from 'src/type-orm-utilities/query.service';

const queryService = new QueryService<MyEntity>();
```

### Applying Filters

You can apply filters to your query using the `applyFilters()` method. Filters are specified as an array of filter criteria objects, each containing the field name, value, and operator. Supported operators include `equals`, `not`, `gt`, `gte`, `lt`, `lte`, `like`, `in`, `notIn`, `isNull`, and `isNotNull`.

```typescript
queryService.applyFilters([
  { field: 'name', value: 'John', operator: 'equals' },
  { field: 'age', value: 30, operator: 'gte' },
]);
```

### Applying Pagination

Pagination can be applied using the `applyPagination()` method. Specify the page number and the number of items per page.

```typescript
queryService.applyPagination(1, 10);
```

### Applying Sorting

To apply sorting to your query, use the `applySorting()` method. Specify an array of sorting criteria objects, each containing the field name and sorting order (`ASC` or `DESC`).

```typescript
queryService.applySorting([
  { field: 'name', order: 'ASC' },
  { field: 'age', order: 'DESC' },
]);
```

### Executing Queries

Once you have configured your query, you can execute it to retrieve results. Use the `getMany()` method to retrieve multiple results or `getOne()` to retrieve a single result.

```typescript
const results = await queryService.getMany();
```

## Methods

### on(query: SelectQueryBuilder<T>): this

Sets the current query builder instance.

### applyPagination(page: number, limit: number): this

Applies pagination to the query.

### applySorting(sort: { field: string; order: 'ASC' | 'DESC' }[]): this

Applies sorting to the query based on given fields and orders.

### applyFilters(filters: { field: string; value: any; operator: string }[]): this

Applies filters to the query based on given filter criteria.

### getMany(): Promise<T[]>

Executes the query and retrieves multiple results.

### getOne(): Promise<T>

Executes the query and retrieves a single result.

### getQuery(): SelectQueryBuilder<T>

Returns the underlying `SelectQueryBuilder` instance.

## Example

```typescript
import { QueryService } from 'src/type-orm-utilities/query.service';
import { MyEntity } from 'src/entities/my-entity.entity';

const queryService = new QueryService<MyEntity>();

queryService.on(myRepository.createQueryBuilder('entity'))
  .applyFilters([
    { field: 'name', value: 'John', operator: 'equals' },
    { field: 'age', value: 30, operator: 'gte' },
  ])
  .applyPagination(1, 10)
  .applySorting([
    { field: 'name', order: 'ASC' },
    { field: 'age', order: 'DESC' },
  ]);

const results = await queryService.getMany();
```

---
