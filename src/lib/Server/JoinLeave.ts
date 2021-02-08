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
  public user: { nickname: string; pubkey: string };

  constructor(server: Server, data: IBaseEvent<IJoinLeave>) {
    this.server = server;

    this.user = {
      nickname: data.d.user.nick,
      pubkey: data.d.user.pubkey
    };
  }
}
