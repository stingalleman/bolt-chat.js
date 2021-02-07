import { IServerJoinConfig } from '../../interfaces';
import { Bolt } from '../Bolt';
import { Server } from './Server';

export class ServerManager {
  /**
   * In here are all the servers we are currently connected to.
   */
  servers: Server[];

  constructor(private bolt: Bolt) {
    this.servers = [];
  }

  /**
   * @param config The config object to join a server.
   */
  async join(config: IServerJoinConfig): Promise<Server> {
    const server = new Server(this.bolt, config);
    if (config.autoConnect === undefined ? true : config.autoConnect) await server.connect();
    this.servers.push(server);
    return server;
  }

  /**
   * @param server The server you want to leave.
   */
  leave(server: Server): void {
    server.connection.end();
    this.servers.splice(this.servers.indexOf(server), 1);
  }
}
