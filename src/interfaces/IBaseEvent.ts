import { EventType } from './EventType';

export interface IBaseEvent {
  e: {
    t: EventType;
    c: number;
    r?: number;
  };
}
