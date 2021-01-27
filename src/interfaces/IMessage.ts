import { IBaseEvent } from './IBaseEvent';

export interface IMessage extends IBaseEvent {
  msg: {
    sent: number; // TODO: date (epoch)
    body: string;
    user: { nick: string };
  };
}
