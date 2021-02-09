import { IBaseEvent, IMessage } from '../../interfaces';
import { Server } from '../Server/Server';

export class Message {
  /**
   * The server that this message was send in.
   */
  public server: Server;

  /**
   * The content of this message.
   */
  public content: string;

  /**
   * The signature of this message.
   */
  public signature: string;

  /**
   * The author is this message.
   */
  public author: { username: string };

  constructor(server: Server, data: IBaseEvent<IMessage>) {
    this.server = server;

    this.content = data.d.msg.body;

    this.signature = data.d.msg.sig;

    this.author = {
      username: data.d.msg.user.nick
    };
  }
}
