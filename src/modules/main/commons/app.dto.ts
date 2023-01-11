import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  Matches,
} from "class-validator";
import { ResponseMessage } from "../../../utils/enum";

export class ContactUsDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  @Matches(
    /^[a-zA-Z0-9_\.\-]*[a-zA-Z0-9]+\@(([a-zA-Z0-9\-]){3,30}\.)+([a-zA-Z0-9]{2,5})$/,
    { message: ResponseMessage.INVALID_EMAIL }
  )
  @Matches(/^(?!.*[\-\_\.]{2}).*$/, { message: ResponseMessage.INVALID_EMAIL })
  email: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  phoneNumber: string;

  @IsNotEmpty()
  @IsString()
  company: string;

  @IsPositive()
  @IsOptional()
  companySize: number;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  jobTitle: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  country: string;

  @IsNotEmpty()
  @IsString()
  message: string;
}
