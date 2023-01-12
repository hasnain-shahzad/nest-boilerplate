import {
  Body,
  Controller,
  Get,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LoginPayload } from './login.payload';
import { AuthService } from './auth.service';
import { CurrentUser } from '../common/decorator/current-user.decorator';
import { User } from '../user';
import { LoggerService } from '../../utils/logger/logger.service';
import {
  LoggerMessages,
  ResponseCode,
  ResponseMessage,
} from '../../utils/enum';
import { Response } from 'express';
import { RegisterPayload } from './register.payload';

@Controller('api/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly loggerService: LoggerService,
  ) {
    this.loggerService.setContext('AuthController');
  }

  /** ******************************************************************************************************************/
  /*
  /*                                    LOGIN
  /*
  /********************************************************************************************************************/
  @Post('signup')
  async signup(
    @Body() payload: RegisterPayload,
    @Res() res: Response,
  ): Promise<Response> {
    this.loggerService.log(`POST auth/login ${LoggerMessages.API_CALLED}`);
    await this.authService.signUp(payload);
    return res.status(ResponseCode.SUCCESS).send({
      statusCode: ResponseCode.SUCCESS,
      message: ResponseMessage.SUCCESS
    });
  }
  
  @Post('login')
  async login(
    @Body() payload: LoginPayload,
    @Res() res: Response,
  ): Promise<Response> {
    this.loggerService.log(`POST auth/login ${LoggerMessages.API_CALLED}`);
    const user = await this.authService.validateUser(payload);
    const token = this.authService.createToken(user);
    return res.status(ResponseCode.SUCCESS).send({
      statusCode: ResponseCode.SUCCESS,
      message: ResponseMessage.SUCCESS,
      data: token.accessToken,
    });
  }

  /** ******************************************************************************************************************/
  /*
  /*                                    CURRENT USER
  /*
  /********************************************************************************************************************/

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  getLoggedInUser(@CurrentUser() user: User): User {
    return user;
  }
}
