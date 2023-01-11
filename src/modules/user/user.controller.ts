import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from '../common/decorator/current-user.decorator';
import {
  LoggerMessages,
  ResponseCode,
  ResponseMessage,
} from '../../utils/enum';
import { LoggerService } from '../../utils/logger/logger.service';
import { User } from './user.entity';
import { UsersService } from './user.service';
import {
  Controller,
  Delete,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';;
;

@UseGuards(AuthGuard('jwt'))
@Controller('api/user')
export class UserController {
  constructor(
    private readonly userService: UsersService,
    private readonly loggerService: LoggerService,
  ) {
    this.loggerService.setContext('UserController');
  }

  /** ******************************************************************************************************************/
  /*
  /*                                   DELETE USER ACCOUNT
  /*
  /********************************************************************************************************************/

  @Delete('me')
  public async deleteUser(
    @CurrentUser() user: User,
    @Res() res: Response,
  ): Promise<Response> {
    this.loggerService.log(`Delete user/me ${LoggerMessages.API_CALLED}`);
    await this.userService.deleteUser(user);
    return res.status(ResponseCode.SUCCESS).send({
      statusCode: ResponseCode.SUCCESS,
      message: ResponseMessage.SUCCESS,
    });
  }
}
