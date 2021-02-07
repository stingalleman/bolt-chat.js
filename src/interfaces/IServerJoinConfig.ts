import { IServerConfig } from '.';

export interface IServerJoinConfig extends IServerConfig {
  /**
   * Default to true.
   */
  autoConnect?: boolean;
}
