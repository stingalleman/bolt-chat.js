import { IMessage } from '../../interfaces';
import { Manager } from '../Manager';
import { Server } from '../Server/Server';

export class MessageManager extends Manager {
  constructor(private server: Server) {
    super('msg', server.connection);
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
          sig: await this.server.bolt.user.getSign(msg),
          user: {
            nick: this.server.bolt.config.identity.username
          }
        }
      },
      ...this.getEvent<IMessage>('msg', time)
    });
  }
}
