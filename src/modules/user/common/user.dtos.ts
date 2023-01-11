import {
  IsNotEmpty,
  Matches,
} from 'class-validator';
import { SameAs } from '../../common/validator/same-as.validator';
import { ResponseMessage } from '../../../utils/enum';

export class ChangePasswordDto {
  @IsNotEmpty()
  currentPassword: string;

  @IsNotEmpty()
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$&+,:;=?@#|'<>.^*()_%!-])[A-Za-z\d$&+,:;=?@#|'<>.^*()_%!-]{8,50}$/,
    {
      message: ResponseMessage.INVALID_PASSWORD,
    },
  )
  newPassword: string;

  @SameAs('newPassword', { message:  `PASSWORD_NOT_MATCH` })
  newPasswordConfirmation: string;
}
