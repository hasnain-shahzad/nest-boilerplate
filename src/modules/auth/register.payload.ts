import {
  IsNotEmpty,
  IsString,
  IsEnum,
  IsOptional,
  IsPositive,
  IsBoolean,
} from 'class-validator';
import { Gender } from './common/auth.enums';

export class RegisterPayload {
  @IsNotEmpty()
  @IsOptional()
  name: string;

  
  @IsPositive()
  @IsOptional()
  age: number;

 
  @IsEnum(Gender)
  @IsOptional()
  gender: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  avatar: string;

  @IsOptional()
  @IsBoolean()
  fromSignup: boolean;
}
