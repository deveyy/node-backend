import { Server } from 'socket.io';

let socketIOShowreelObject: Server;

export class SocketIOShowreelHandler {
  public listen(io: Server): void {
    socketIOShowreelObject = io;
  }
}

export { socketIOShowreelObject };
