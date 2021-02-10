import * as pgp from 'openpgp';
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
  public user: { username: string; pubkey: string; slug: string };

  constructor(server: Server, data: IBaseEvent<IJoinLeave>) {
    this.server = server;

    this.user = {
      username: data.d.user.nick,
      pubkey: data.d.user.pubkey,
      slug: 'Use getSlug() until the slug is defined in the protocol.'
    };
  }

  /**
   * Get slug.
   */
  public async getSlug(): Promise<string> {
    const keys = await pgp.key.readArmored(this.user.pubkey);
    const slug = keys.keys[0].getFingerprint().slice(-4).toUpperCase();
    return slug;
  }
}
