import { EventType, IBaseEvent } from '../interfaces';

export abstract class Manager {
  protected type: EventType;

  constructor(type: EventType) {
    this.type = type;
  }

  protected getRawEvent(time?: number): IBaseEvent {
    return {
      e: {
        t: this.type,
        c: time || new Date().getTime()
      }
    };
  }
}
