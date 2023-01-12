import { HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ResponseCode } from '../../utils/enum';
import { MailService } from '../../utils/mailer/mail.service';
import { Hash } from '../../utils/Hash';
import { User, UsersService } from './../user';
import { LoginPayload } from './login.payload';
import { RegisterPayload } from './register.payload';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
    private readonly mailService: MailService
  ) { }

  /**
   * Generate jwt token for user
   *
   * @param user
   * @param expiryTime
   * @param subject
   * @returns
   */
  createToken(
    user: User,
    expiryTime?: number | string | null,
    subject?: string,
  ) {
    return {
      expiresIn: expiryTime ? expiryTime : process.env.JWT_EXPIRATION_TIME,
      accessToken: this.jwtService.sign(
        { uuid: user?.uuid },
        {
          subject: subject ? subject : '',
          expiresIn: expiryTime ? expiryTime : process.env.JWT_EXPIRATION_TIME,
        },
      ),
      user: user.toDto(),
    };
  }

  /** ******************************************************************************************************************/
  /*
  /*                                    LOGIN
  /*
  /********************************************************************************************************************/


  /**
   * Validate user for Login
   *
   * @param payload
   * @returns user
   */
  async validateUser(payload: LoginPayload): Promise<User> {
    let user: User;
    try {
      user = await this.userService.getByEmail(payload.email);
      if (!user) {
        throw new HttpException(
          `INVALID_USERNAME_OR_PASSWORD`,
          ResponseCode.BAD_REQUEST,
        );
      }
      if (!user.password) {
        throw new HttpException(
          `PASSWORD_NOT_SET`,
          ResponseCode.BAD_REQUEST,
        );
      }
      const isValidPassword = await Hash.compare(
        payload.password,
        user.password,
      );
      if (!isValidPassword) {
        throw new HttpException(
          `INVALID_USERNAME_OR_PASSWORD`,
          ResponseCode.BAD_REQUEST,
        );
      }
      return user;
    } catch (err) {
      throw err;
    }
  }

  /**
   * Register New User
   *  
   * @param payload RegisterPayload 
   */
  async signUp(payload: RegisterPayload) {
    await this.userService.create(payload);
    await this.mailService.sendEmail(payload.email);
    return;
  }
}
