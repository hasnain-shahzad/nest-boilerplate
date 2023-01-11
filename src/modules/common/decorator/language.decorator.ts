import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { LanguageEnum } from './../../../utils/language/common/language.enum';
export const GetLanguage = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    let language = LanguageEnum.ENGLISH;
    const supportLanguage = [LanguageEnum.ENGLISH, LanguageEnum.KOREAN];
    if (
      request?.headers?.language &&
      supportLanguage.includes(request?.headers?.language)
    )
      language = request.headers.language;
    return language;
  },
);
