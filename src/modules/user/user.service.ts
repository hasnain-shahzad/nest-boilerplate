import {
  HttpException,
  Injectable,
  NotAcceptableException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Hash } from '../../utils/Hash';
import { RegisterPayload } from './../auth/register.payload';
import { ILike, Repository } from 'typeorm';
import { ResponseCode, ResponseMessage } from '../../utils/enum';
import { User, UserFillableFields } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) { }

  /**
   * Get user by uuid with relations
   *
   * @param uuid
   * @returns user
   */
  async get(uuid: string) {
    return await this.userRepository.findOne({ uuid });
  }

  /**
   * Get user by email with optional relations
   *
   * @param email
   * @param relation
   * @returns
   */
  async getByEmail(email: string, relation?: string[]): Promise<User> {
    return await this.userRepository.findOne({
      where: {
        email: ILike(email),
      },
      relations: relation,
    });
  }

  /**
   * Get user with active status by email
   *
   * @param email
   * @returns
   */
  async getActiveUser(email: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: {
        email,
        isActive: true,
      },
    });
    if (!user) {
      throw new HttpException(
        ResponseMessage.EMAIL_NOT_REGISTERED,
        ResponseCode.BAD_REQUEST,
      );
    }
    return user;
  }

  /**
   * Create new user
   *
   * @param payload
   * @returns
   */
  async create(payload: RegisterPayload) {
    const user = await this.getByEmail(payload.email);

    if (user) {
      throw new NotAcceptableException(
        'User with provided email already created.',
      );
    }
    const passwordHash = await Hash.make(payload.password);
    payload.password = passwordHash;
    const newUser = new User().fromDto(payload);
    await this.userRepository.save(newUser);
    return;
  }

  /**
   * Save updated user
   *
   * @param user
   * @returns
   */
  async save(user: User) {
    return await this.userRepository.save(user);
  }

  /**
   * Update user info on signup
   *
   * @param user
   * @param payload
   * @returns
   */
  public async updateUserInfo(user: User, payload: RegisterPayload) {
    user.name = payload.name;
    return await this.userRepository.save(user);
  }

  /**
   * Update user password
   *
   * @param email
   * @param password
   * @returns
   */
  public async updatePassword(email: string, password: string) {
    return await this.userRepository.update({ email }, { password });
  }

  /**
   * Make hash password and update password on forgot
   *
   * @param email
   * @param password
   * @returns
   */
  public async confirmForgotPassword(email: string, password: string) {
    const passwordHash = await Hash.make(password);
    return await this.updatePassword(email, passwordHash);
  }

  /**
   * Make password hash and update user password
   *
   * @param email
   * @param password
   * @returns
   */
  public async createPassword(email: string, password: string) {
    const passwordHash = await Hash.make(password);
    return await this.updatePassword(email, passwordHash);
  }

  /**
   * Delete User Account
   *
   * @param user
   * @returns
   */
  public async deleteUser(user: User) {
    await this.userRepository.remove(user);
    return;
  }
}
