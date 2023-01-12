import { Controller, Res, Get, UseGuards } from "@nestjs/common";
import { LoggerService } from "../../utils/logger/logger.service";
import { Response } from "express";
import { ResponseCode, ResponseMessage } from "../../utils/enum";
import { AuthGuard } from "@nestjs/passport";

@Controller("api")
export class AppController {
  constructor(
    private readonly loggerService: LoggerService
  ) {
    this.loggerService.setContext("AppController");
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async get(
    @Res() res: Response
  ): Promise<Response> {
    this.loggerService.log(`POST /api api has been called`);
    return res.status(ResponseCode.SUCCESS).send({
      statusCode: ResponseCode.SUCCESS,
      message: ResponseMessage.SUCCESS,
    });
  }
}
