import { IMessageSent } from '../../interfaces';
import { Manager } from '../Manager';
import { Server } from '../Server/Server';

export class MessageManager extends Manager {
  constructor(private server: Server) {
    super();
  }

  /**
   * Send a message.
   *
   * @param msg Message to send.
   */
  async send(msg: string): Promise<void> {
    this.writeData<IMessageSent>(
      this.server,
      this.getEvent('msg', {
        msg: {
          body: msg,
          sig: await this.server.bolt.user.getSign(msg),
          user: {
            nick: this.server.bolt.config.identity.username
          }
        }
      })
    );
  }
}
