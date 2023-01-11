import { Module } from "@nestjs/common";
import { ChatModule } from "../../modules/chat/chat.module";
import { LoggerModule } from "../../utils/logger/logger.module";
import { SocketService } from "./socket.service";

@Module({
  imports: [LoggerModule, ChatModule],
  providers: [SocketService],
  exports: [SocketService],
})
export class SocketModule {}
