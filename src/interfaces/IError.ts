import { IBaseEvent } from './IBaseEvent';

export interface IError extends IBaseEvent {
  err: string;
}
