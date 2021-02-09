import { IServerJoinConfig } from '../../interfaces';
import { Bolt } from '../Bolt';
import { Manager } from '../Manager';
import { Server } from './Server';

export class ServerManager extends Manager {
  /**
   * In here are all the servers we are currently connected to.
   */
  servers: Server[];

  constructor(private bolt: Bolt) {
    super();
    this.servers = [];
  }

  /**
   * @param config The config object to join a server.
   * @param callback Callback. Will only run if config.callback is set to true (default).
   */
  async join(config: IServerJoinConfig, callback?: (server: Server) => void): Promise<Server> {
    const server = new Server(this.bolt, config);
    if (config.autoConnect === undefined ? true : config.autoConnect) {
      await server.connect(() => {
        if (callback) callback(server);
      });
    }

    this.servers.push(server);
    return server;
  }

  /**
   * @param server The server you want to leave.
   * @param callback Callback.
   */
  leave(server: Server, callback?: () => void): void {
    server.connection.end();
    this.servers.splice(this.servers.indexOf(server), 1);

    if (callback) callback();
  }
}
