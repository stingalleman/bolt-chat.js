import { Socket } from 'net';
import { IMessage, IConfig } from '../../interfaces';
import { Manager } from '../Manager';

/**
 * Message class.
 */
export class MessageManager extends Manager {
  constructor(private config: IConfig, private connection: Socket) {
    super('msg');
  }

  /**
   * Send a message.
   *
   * @param msg Message to send.
   */
  send(msg: string): void {
    const time = Math.round(new Date().getTime() / 1000);
    const data: IMessage = {
      msg: {
        sent: time,
        body: msg,
        user: {
          nick: this.config.username
        }
      },
      ...this.getRawEvent(undefined, time)
    };

    this.connection.write(JSON.stringify(data));
  }
}
