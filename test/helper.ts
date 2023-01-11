import { INestApplication } from '@nestjs/common';
import { getConnection } from 'typeorm';

export class Helper {
  private app: INestApplication;
  private token: string;

  constructor(app: INestApplication) {
    this.app = app;
  }

  // /**
  //  * Initialize testsuite
  //  * @returns accessToken
  //  */
  // public async init() {
  //   const email = `testuser@yopmail.com`;
  //   const repository = getConnection().getRepository(User);
  //   const exists = await repository.findOne({ email });
  //   if (!exists) {
  //     await this.register();
  //   }
  //   await this.login(email, 'aPass12d@');
  //   return this.token;
  // }

  // /**
  //  * Register a test user
  //  * @returns
  //  */
  // public async register() {
  //   const testUserDto = {
  //     userName: 'test_user',
  //     email: 'testuser@yopmail.com',
  //     country: 'Pakistan',
  //     phoneNumber: '+923333333333',
  //     password: 'aPass12d@',
  //     passwordConfirmation: 'aPass12d@'
  //   };

  //   await request(this.app.getHttpServer())
  //     .post('/api/auth/register')
  //     .send(testUserDto)
  //     .expect(201);
  //   return;
  // }

  // /**
  //  * Get Jwt Token of User
  //  * @returns JwtToken
  //  */
  // public getAccessToken() {
  //   return `Bearer ${this.token}`;
  // }

  //  /**
  //  * Get Jwt Token of User
  //  * @returns JwtToken
  //  */
  // public async getUserVerificationCode(email: string) {
  //   const userRepository = getConnection().getRepository(User);
  //   const user = await userRepository.findOne({email});
  //   return user?.verificationCode;
  // }

  // /**
  //  * Login a test user
  //  * @returns
  //  */
  // public async login(mail: string, pass: string) {
  //   const testUserDto = {
  //     email: mail,
  //     password: pass,
  //   };
  //   await request(this.app.getHttpServer())
  //     .post('/api/auth/login')
  //     .send(testUserDto)
  //     .expect(201)
  //     .expect(({ body }) => {
  //       expect(body.accessToken).toBeDefined();
  //       this.token = body.accessToken;
  //     });
  // }

  /**
   * clear `test` database
   */
  public async clearDB() {
    const entities = getConnection().entityMetadatas;
    for (const entity of entities) {
      const repository = getConnection().getRepository(entity.name);
      await repository.query(
        `TRUNCATE ${entity.tableName} RESTART IDENTITY CASCADE;`,
      );
    }
  }
}
