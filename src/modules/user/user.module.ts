import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersService } from './user.service';
import { LoggerModule } from '../../utils/logger/logger.module';
import { UserController } from './user.controller';
import { MailModule } from '../../utils/mailer/mail.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    LoggerModule,
    MailModule,
  ],
  controllers: [UserController],
  exports: [UsersService],
  providers: [UsersService],
})
export class UserModule {}
