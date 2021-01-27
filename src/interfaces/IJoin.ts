import { IBaseEvent } from './IBaseEvent';

export interface IJoinLeave extends IBaseEvent {
  user: {
    nick: string;
  };
}
