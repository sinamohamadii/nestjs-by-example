import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { TestingController } from './testing.controller';
import { MathService } from './math.service';

// An END-TO-END (e2e) test: it starts a real Nest app and sends real HTTP
// requests with supertest, checking the whole route from request to response.
describe('Testing routes (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [TestingController],
      providers: [MathService],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('GET /testing/add?a=2&b=3 returns 5', () => {
    return request(app.getHttpServer())
      .get('/testing/add?a=2&b=3')
      .expect(200)
      .expect({ result: 5 });
  });

  it('GET /testing/add with a non-number returns 400', () => {
    return request(app.getHttpServer()).get('/testing/add?a=foo&b=3').expect(400);
  });
});
