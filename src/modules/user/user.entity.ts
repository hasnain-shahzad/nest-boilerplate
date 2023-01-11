import { RegisterPayload } from '../auth';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn
} from 'typeorm';
import { BaseEntity } from '../common/entity/base.entity';

@Entity({
  name: 'users',
})
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({ nullable: true })
  name: string;

  @Column({ length: 255 })
  email: string;

  @Column({
    name: 'password',
    length: 255,
    nullable: true,
  })
  password: string;

  @Column({ nullable: true })
  phoneNumber: string;

  @Column({ nullable: true })
  age: number;

  @Column({ nullable: true })
  country: string;

  @Column({ nullable: true })
  gender: string;

  @Column({
    type: 'boolean',
    default: false,
  })
  isActive: boolean;

  @Column({ nullable: true })
  profileImage: string;

  toJSON() {
    const { password, ...self } = this;
    return self;
  }

  toDto() {
    const { password, ...dto } = this;
    return dto;
  }

  fromDto(payload: RegisterPayload): User {
    this.name = payload.name;
    this.age = payload.age;
    this.gender = payload.gender;
    return this;
  }
}

export class UserFillableFields {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}
