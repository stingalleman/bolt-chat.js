import { IBaseEvent, IMotd } from '../../interfaces';
import { Server } from './Server';

export class ServerMotd {
  /**
   * The server that this error came from.
   */
  public server: Server;

  /**
   * The message of the day.
   */
  motd: string;

  constructor(server: Server, data: IBaseEvent<IMotd>) {
    this.server = server;
    this.motd = data.d.motd;
  }
}
