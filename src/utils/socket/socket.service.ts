import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from "@nestjs/websockets";
import { Socket, Server } from "socket.io";
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
}
