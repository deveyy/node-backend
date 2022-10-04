import { Server } from 'socket.io';

export let socketIOShowreelObject: Server;

export class SocketIOShowreelHandler {
  private io: Server;

  constructor(io: Server) {
    this.io = io;
    socketIOShowreelObject = io;
  }

  public listen(): void {
    this.io.on('connection', () => {
      console.log('Error');
    });
  }
}
