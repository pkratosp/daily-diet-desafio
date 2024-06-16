import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { randomUUID } from 'crypto';
import { execSync } from 'node:child_process'

describe('UserController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  beforeEach(() => {
    execSync('npm run clear:database')
  })

  afterAll(async () => {
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

  it('/meals (POST)', async () => {
    const username = `${randomUUID()}@gmail.com`
    const createUser = await request(app.getHttpServer())
      .post('/users')
      .send({
        "name": "jhon doe",
        "email": username,
        "password": "1234567"
      })

    const authSignIn = await request(app.getHttpServer())
      .post('/auth')
      .send({
            "username": username,
            "password": "1234567"
      })

    const userToken = authSignIn.body.token

    const createMeal = await request(app.getHttpServer())
    .post('/meals')
    .send({
        "name":"nova refeição",
        "description": "salada",
        "isOnTheDiet": true
    })
    .set("Authorization", `Bearer ${userToken}`)
    .expect(201)


    expect(createMeal.body).toEqual(
        expect.objectContaining({
            "id": expect.any(String),
        })
    )
  })

  it('/meals:id (PATCH)', async () => {
    const username = `${randomUUID()}@gmail.com`
    const createUser = await request(app.getHttpServer())
      .post('/users')
      .send({
        "name": "jhon doe",
        "email": username,
        "password": "1234567"
      })

    const authSignIn = await request(app.getHttpServer())
      .post('/auth')
      .send({
            "username": username,
            "password": "1234567"
      })

    const userToken = authSignIn.body.token

    const createMeal = await request(app.getHttpServer())
    .post('/meals')
    .send({
        "name":"nova refeição",
        "description": "salada",
        "isOnTheDiet": true
    })
    .set("Authorization", `Bearer ${userToken}`)
    
    const mealId = createMeal.body.id

    const updateMeal = await request(app.getHttpServer())
    .patch(`/meals/${mealId}`)
    .send({
        "description": "editando descrição",
    })
    .set("Authorization", `Bearer ${userToken}`)



    expect(updateMeal.body.updateMeal).toEqual(
        expect.objectContaining({
            "description": "editando descrição",
        })
    )
  })
  
  it('/meals (GET)', async () => {
    const username = `${randomUUID()}@gmail.com`
    const createUser = await request(app.getHttpServer())
      .post('/users')
      .send({
        "name": "jhon doe",
        "email": username,
        "password": "1234567"
      })

    const authSignIn = await request(app.getHttpServer())
      .post('/auth')
      .send({
            "username": username,
            "password": "1234567"
      })

    const userToken = authSignIn.body.token

    const createMeal = await request(app.getHttpServer())
    .post('/meals')
    .send({
        "name":"nova refeição",
        "description": "salada",
        "isOnTheDiet": true
    })
    .set("Authorization", `Bearer ${userToken}`)


    const listAllMeals = await request(app.getHttpServer())
      .get('/meals')
      .set("Authorization", `Bearer ${userToken}`)
      .expect(200)
      
    expect(listAllMeals.body.listMeals).toEqual([
      expect.objectContaining({
        "name":"nova refeição",
        "description": "salada",
        "isOnTheDiet": true
      })
    ])
  })

  it('/meals/:id (GET)', async () => {
    const username = `${randomUUID()}@gmail.com`
    const createUser = await request(app.getHttpServer())
      .post('/users')
      .send({
        "name": "jhon doe",
        "email": username,
        "password": "1234567"
      })

    const authSignIn = await request(app.getHttpServer())
      .post('/auth')
      .send({
            "username": username,
            "password": "1234567"
      })

    const userToken = authSignIn.body.token

    const createMeal = await request(app.getHttpServer())
    .post('/meals')
    .send({
        "name":"nova refeição",
        "description": "salada",
        "isOnTheDiet": true
    })
    .set("Authorization", `Bearer ${userToken}`)
    
    const mealId = createMeal.body.id

    const findUniqueMeal = await request(app.getHttpServer())
    .get(`/meals/${mealId}`)
    .set("Authorization", `Bearer ${userToken}`)
    .expect(200)

    expect(findUniqueMeal.body).toEqual(
      expect.objectContaining({
        "name":"nova refeição",
        "description": "salada",
        "isOnTheDiet": true
      })
    )
  })

  it('/meals (DELETE)', async () => {
    const username = `${randomUUID()}@gmail.com`
    const createUser = await request(app.getHttpServer())
      .post('/users')
      .send({
        "name": "jhon doe",
        "email": username,
        "password": "1234567"
      })

    const authSignIn = await request(app.getHttpServer())
      .post('/auth')
      .send({
            "username": username,
            "password": "1234567"
      })

    const userToken = authSignIn.body.token

    const createMeal = await request(app.getHttpServer())
    .post('/meals')
    .send({
        "name":"nova refeição",
        "description": "salada",
        "isOnTheDiet": true
    })
    .set("Authorization", `Bearer ${userToken}`)
    
    const mealId = createMeal.body.id

    const deleteMeal = await request(app.getHttpServer())
      .delete(`/meals/${mealId}`)
      .set("Authorization", `Bearer ${userToken}`)
      .expect(200)

    expect(deleteMeal.body.deleteMeal).toEqual(true)
  })

});
