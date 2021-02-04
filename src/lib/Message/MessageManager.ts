import { IMessage } from '../../interfaces';
import { Bolt } from '../Bolt';
import { Manager } from '../Manager';

export class MessageManager extends Manager {
  constructor(private bolt: Bolt) {
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
          nick: this.bolt.config.identity.username
        }
      },
      ...this.getRawEvent(undefined, time)
    };

    this.bolt.connection.write(JSON.stringify(data));
  }
}
