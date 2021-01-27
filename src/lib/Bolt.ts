import { Socket } from 'net';
import { IMessage, IConfig, EventType, IJoinLeave, IError, IMotd } from '../interfaces';
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

  /**
   * Execute the callback if event.
   * @param event Event to listen to.
   * @param callback Callback function.
   */
  public on(event: 'msg', callback: (data: IMessage) => void): void;

  public on(event: 'join', callback: (data: IJoinLeave) => void): void;

  public on(event: 'leave', callback: (data: IJoinLeave) => void): void;

  public on(event: 'err', callback: (data: IError) => void): void;

  public on(event: 'motd', callback: (data: IMotd) => void): void;

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
  public on(event: EventType, callback: (data: any) => void): void {
    this.connection.on('data', (d) => {
      const data = JSON.parse(d.toString());
      if (data.e.t !== event) return;
      callback(data);
    });
  }
}
