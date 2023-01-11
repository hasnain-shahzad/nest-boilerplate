import { Test } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Helper } from '../helper';
import { AppModule } from '../../src/modules/main/app.module';
import { MailService } from '../../src/utils/mailer/mail.service';
import { LoggerMock, MailerMock } from '../mocks/provider.mock';
import { LoggerService } from '../../src/utils/logger/logger.service';

describe('Chuzi sample test', () => {
  let app: INestApplication;
  let helper: Helper;
  let server: any;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(MailService)
      .useValue(MailerMock)
      .overrideProvider(LoggerService)
      .useValue(LoggerMock)
      .compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    await app.init();
    helper = new Helper(app);
    server = app.getHttpServer();
  });

  it(`Test /sample API`, async () => {
    expect(server).toBeDefined();
  });

  afterAll(async () => {
    await helper.clearDB();
    await app.close();
  })
});
