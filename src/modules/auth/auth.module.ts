import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from './../user';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';
import { LoggerModule } from '../../utils/logger/logger.module';
import { MailModule } from '../../utils/mailer/mail.module';

@Module({
  imports: [
    UserModule,
    LoggerModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [],
      useFactory: async () => {
        return {
          secret: process.env.JWT_SECRET_KEY,
          signOptions: {
            ...(process.env.JWT_EXPIRATION_TIME
              ? {
                  expiresIn: process.env.JWT_EXPIRATION_TIME,
                }
              : {}),
          },
        };
      },
      inject: [],
    }),
    MailModule
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [PassportModule.register({ defaultStrategy: 'jwt' })],
})
export class AuthModule {}
