import { IBaseEvent, IMessage } from '../../interfaces';
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
      e: {
        t: 'msg',
        c: Math.round(new Date().getTime() / 1000)
      }
    });
  }

  /**
   * Write JSON to server.
   *
   * @param data Data to write.
   * @param callback Optional callback function.
   */
  protected writeJson<T>(data: IBaseEvent<T>, callback?: () => void): IBaseEvent<T> {
    this.server.connection.write(JSON.stringify(data), () => {
      if (callback) callback();
    });

    return data;
  }
}
