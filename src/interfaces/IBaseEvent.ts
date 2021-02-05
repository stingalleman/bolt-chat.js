import { EventType } from './EventType';

export interface IBaseEvent<T> {
  e: {
    t: EventType;
    c: number;
    r?: number;
  };
  d?: T;
}
