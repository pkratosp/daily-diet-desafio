import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { randomUUID } from 'crypto';
import { execSync } from 'node:child_process';

describe('UserController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    execSync('npm run clear:database')
    const moduleFixture: TestingModule = await Test.createTestingModule({
        imports: [AppModule],
    }).compile();
    
    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    execSync('npm run clear:database')
    await app.close()
  })

  it('/users (POST)', async () => {
    const createUser = await request(app.getHttpServer())
      .post('/users')
      .send({
        "name": "jhon doe",
        "email": `${randomUUID()}@gmail.com`,
        "password": "1234567"
      })
      .expect(201)
    

    expect(createUser.body).toEqual(
        expect.objectContaining({
            "name": "jhon doe"
        })
    )
  });
});
