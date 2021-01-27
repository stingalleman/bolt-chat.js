import { EventType, IBaseEvent } from '@interfaces';
import { IConfig } from '@interfaces/IConfig';
import { Socket } from 'net';
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

  on(event: EventType, callback: (data: Buffer) => void): void {
    this.connection.on('data', (d) => {
      callback(d);
    });
  }
}
