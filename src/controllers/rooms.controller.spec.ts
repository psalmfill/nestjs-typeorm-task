import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../app.module';

describe('RoomsController (e2e)', () => {
  let app: INestApplication;
 

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

  });

  afterAll(async () => {
    // await roomRepository.query('DELETE FROM room');
    await app.close();
  });

  it('GET /api/rooms?page=0&limit=10&filters=[]&sort=[{"field":"name","order":"ASC"}]', () => {
    return request(app.getHttpServer())
      .get('/api/rooms?page=0&limit=10&filters=[]&sort=[{"field":"name","order":"ASC"}]')
      .expect(200)
      .expect(({ body }) => {
        expect(body.length).toBe(10);
        expect(body[0].name).toBe("Board Room G");
      });
  });

  it('GET /api/rooms?page=0&limit=5&filters=[{"field":"capacity","value":10,"operator":"gte"}]&sort=[{"field":"name","order":"ASC"}]', () => {
    return request(app.getHttpServer())
      .get('/api/rooms?page=0&limit=5&filters=[{"field":"capacity","value":10,"operator":"gte"}]&sort=[{"field":"name","order":"ASC"}]')
      .expect(200)
      .expect(({ body }) => {
        expect(body.length).toBe(5);
        expect(body[0].name).toBe("Board Room G");
      });
  });

  it('GET /api/rooms?page=1&limit=2&filters=[{"field":"userId","value":1,"operator":"equals"}]&sort=[{"field":"capacity","order":"DESC"}]', () => {
    return request(app.getHttpServer())
      .get('/api/rooms?page=1&limit=2&filters=[{"field":"userId","value":1,"operator":"equals"}]&sort=[{"field":"capacity","order":"DESC"}]')
      .expect(200)
      .expect(({ body }) => {
        expect(body.length).toBe(2);
        expect(body[0].capacity).toBe(12); // Expected capacity in descending order
      });
  });

  it('GET /api/rooms?page=0&limit=5&filters=[{"field":"name","value":"Room","operator":"like"}]&sort=[{"field":"userId","order":"ASC"}]', () => {
    return request(app.getHttpServer())
      .get('/api/rooms?page=0&limit=5&filters=[{"field":"name","value":"Room","operator":"like"}]&sort=[{"field":"userId","order":"ASC"}]')
      .expect(200)
      .expect(({ body }) => {
        expect(body.length).toBe(5);
        expect(body[0].name).toBe("Project Room K");
      });
  });
});
