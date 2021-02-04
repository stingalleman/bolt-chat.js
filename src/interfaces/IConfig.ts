import { Identity } from '../lib/User/Identity';

export interface IConfig {
  host: string;
  port?: number;
  identity: Identity;
}
