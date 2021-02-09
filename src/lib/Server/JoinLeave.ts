import { IBaseEvent, IJoinLeave } from '../../interfaces';
import { Server } from './Server';

export class JoinLeave {
  /**
   * The server that this join or leave was in.
   */
  public server: Server;

  /**
   * The user that joined or left.
   */
  public user: { username: string; pubkey: string };

  constructor(server: Server, data: IBaseEvent<IJoinLeave>) {
    this.server = server;

    this.user = {
      username: data.d.user.username,
      pubkey: data.d.user.pubkey
    };
  }
}
