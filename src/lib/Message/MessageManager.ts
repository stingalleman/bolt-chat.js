import { IMessage } from '../../interfaces';
import { Bolt } from '../Bolt';
import { Manager } from '../Manager';

export class MessageManager extends Manager {
  constructor(private bolt: Bolt) {
    super('msg', bolt.connection);
  }

  /**
   * Send a message.
   *
   * @param msg Message to send.
   */
  async send(msg: string): Promise<void> {
    const time = Math.round(new Date().getTime() / 1000);

    this.writeJson<IMessage>({
      d: {
        msg: {
          body: msg,
          sig: await this.bolt.user.getSign(msg),
          user: {
            nick: this.bolt.config.identity.username
          }
        }
      },
      ...this.getEvent<IMessage>('msg', time)
    });
  }
}
