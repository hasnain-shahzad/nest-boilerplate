import {
  IsNotEmpty,
  IsString
} from 'class-validator';
import { IsValidCountry } from '../../common/validator/country.validator';
import { IsValidPhoneNumber } from '../../common/validator/phone.validator';
import { Transform } from 'class-transformer';
import {
  parsePhoneNumberFromString,
} from 'libphonenumber-js';

export class PhoneNumberDTO {
  @IsNotEmpty()
  @IsValidCountry()
  country: string;

  @IsNotEmpty()
  @IsValidPhoneNumber()
  @Transform((phone) => parsePhoneNumberFromString(phone.value).number)
  phoneNumber: string;
}

export class PhoneNumberVerifyDTO {
  @IsNotEmpty()
  @IsValidCountry()
  country: string;

  @IsNotEmpty()
  @IsValidPhoneNumber()
  @Transform((phone) => parsePhoneNumberFromString(phone.value).number)
  phoneNumber: string;

  @IsNotEmpty()
  @IsString()
  token: string;
}
