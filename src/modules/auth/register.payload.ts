import {
  IsNotEmpty,
  IsEmail,
  Matches,
  IsString,
} from 'class-validator';
import { SameAs } from 'modules/common/validator/same-as.validator';
import { ResponseMessage } from 'utils/enum';

export class RegisterPayload {
  @IsNotEmpty()
  name: string;

  @IsString()
  @Matches(
    /^[a-zA-Z0-9_\.\-]*[a-zA-Z0-9]+\@(([a-zA-Z0-9\-]){3,30}\.)+([a-zA-Z0-9]{2,5})$/,
    { message: ResponseMessage.INVALID_EMAIL }
  )
  email: string;

  @IsNotEmpty()
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$&+,:;=?@#|'<>.^*()_%!-])[A-Za-z\d$&+,:;=?@#|'<>.^*()_%!-]{8,50}$/,
    {
      message: ResponseMessage.INVALID_PASSWORD,
    },
  )
  password: string;

  @SameAs('password', { message: `PASSWORD_NOT_MATCH` })
  passwordConfirmation: string;
}
