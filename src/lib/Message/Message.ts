import { IBaseEvent, IMessageReceived } from '../../interfaces';
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
   * The author is this message.
   */
  public author: { username: string; slug: string };

  constructor(server: Server, data: IBaseEvent<IMessageReceived>) {
    this.server = server;

    this.content = data.d.msg.body;

    this.author = {
      username: data.d.msg.user.nick,
      slug: data.d.msg.fprint.slice(-4).toUpperCase()
    };
  }
}
