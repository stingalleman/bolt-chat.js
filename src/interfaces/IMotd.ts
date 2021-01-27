import { IBaseEvent } from './IBaseEvent';

export interface IMotd extends IBaseEvent {
  motd: string;
}
