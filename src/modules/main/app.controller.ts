import { Controller, Res, Body, Post } from "@nestjs/common";
import { LoggerService } from "../../utils/logger/logger.service";
import { AppService } from "./app.service";
import { Response } from "express";
import { ResponseCode, ResponseMessage } from "../../utils/enum";
import { ContactUsDto } from "./commons/app.dto";

@Controller("api")
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly loggerService: LoggerService
  ) {
    this.loggerService.setContext("AppController");
  }

  @Post("contact_us")
  async contactUs(
    @Body() body: ContactUsDto,
    @Res() res: Response
  ): Promise<Response> {
    this.loggerService.log(`POST /api/contact_us api has been called`);
    await this.appService.sendMailToContact(body);
    return res.status(ResponseCode.SUCCESS).send({
      statusCode: ResponseCode.SUCCESS,
      message: ResponseMessage.SUCCESS,
    });
  }
}
