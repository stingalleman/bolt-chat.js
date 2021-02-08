import { EventEmitter } from 'events';
import { IConfig, IBoltEmitter, IEvents } from '../interfaces';
import { ServerManager } from './Server/ServerManager';
import { UserManager } from './User/UserManager';

/**
 * Main Bolt class.
 */
export class Bolt extends (EventEmitter as new () => IBoltEmitter<IEvents>) {
  /**
   * Everything that has to do with a user.
   */
  public user: UserManager;

  /**
   * Config you passed through when making a new Bolt() instance.
   */
  public config: IConfig;

  /**
   * Everything that has to do with a server.
   */
  public servers: ServerManager;

  /**
   * @param config Config.
   */
  constructor(config: IConfig) {
    super();
    this.config = config;
    this.user = new UserManager(this);
    this.servers = new ServerManager(this);
  }
}
