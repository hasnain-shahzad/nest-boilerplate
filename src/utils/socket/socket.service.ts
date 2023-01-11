import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from "@nestjs/websockets";
import { Socket, Server } from "socket.io";
import { Notifications } from "./commons/socket.enums";
import { Chat } from "../../modules/chat/chat.entity";
import { ChatService } from "../../modules/chat/chat.service";
import { LoggerService } from "../../utils/logger/logger.service";

@WebSocketGateway(3002, {
  cors: {
    origin: "*",
  },
})
export class SocketService
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    private readonly chatService: ChatService,
    private readonly loggerService: LoggerService
  ) {
    this.loggerService.setContext("AppGateway");
  }
  @WebSocketServer()
  server: Server;

  public afterInit(server: Server) {
    this.loggerService.log("Initialized .....");
  }

  public handleConnection(client: Socket, ...args: any[]) {
    this.loggerService.log(`Client connected: ${client.id}`);
  }

  public handleDisconnect(client: Socket) {
    this.loggerService.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage("createRoom")
  public createRoom(client: Socket, email: string) {
    client.join(email);
    this.loggerService.log(`Room created: ${email}`);
  }

  @SubscribeMessage("joinRoom")
  public joinRoom(client: Socket, email: string) {
    client.join(email);
    this.loggerService.log(`Room joined: ${email}`);
  }

  @SubscribeMessage("messageToSupport")
  public async handleMessageToSupport(client: Socket, payload: Chat) {
    await this.chatService.createMessage(payload);
    this.server
      .to(payload.email)
      .emit(Notifications.MESSAGE_TO_SUPPORT, payload.text);
  }

  @SubscribeMessage("messageToClient")
  public async handleMessageToClient(client: Socket, payload: Chat) {
    await this.chatService.createMessage(payload);
    this.server
      .to(payload.email)
      .emit(Notifications.MESSAGE_FROM_SUPPORT, payload.text);
  }
}
