import { Socket } from 'net';
import { IMessage, IConfig } from '../../interfaces';
import { Manager } from '../Manager';

export class MessageManager extends Manager {
  constructor(private config: IConfig, private connection: Socket) {
    super('msg');
  }

  send(msg: string): void {
    const time = new Date().getTime();
    const data: IMessage = {
      msg: {
        sent: time,
        body: msg,
        user: {
          nick: this.config.username
        }
      },
      ...this.getRawEvent(time)
    };

    this.connection.write(JSON.stringify(data));
  }
}
