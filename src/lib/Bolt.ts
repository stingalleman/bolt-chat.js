import { Socket } from 'net';
import { EventType, IMessage, IConfig } from '../interfaces';
import { MessageManager } from './Message/MessageManager';

export class Bolt {
  message: MessageManager;

  protected connection: Socket;

  protected config: IConfig;

  constructor(config: IConfig) {
    this.config = config;
    this.connection = new Socket().connect({
      host: this.config.host,
      port: this.config.port
    });
    this.message = new MessageManager(this.config, this.connection);
  }

  on(event: EventType, callback: (data: IMessage) => void): void {
    this.connection.on('data', (d) => {
      const data = JSON.parse(d.toString());
      if (data.e.t !== event) return;
      callback(data);
    });
  }
}
