import { Module } from "@nestjs/common";
import { LoggerModule } from "../../utils/logger/logger.module";
import { SocketService } from "./socket.service";

@Module({
  imports: [LoggerModule],
  providers: [SocketService],
  exports: [SocketService],
})
export class SocketModule {}
