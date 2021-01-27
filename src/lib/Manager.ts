import { EventType, IBaseEvent } from '@interfaces';
import { MessageManager } from './Message/MessageManager';

export abstract class Manager {
  protected type: EventType;

  protected getRawEvent(time?: number): IBaseEvent {
    return {
      e: {
        t: this.type,
        c: time || new Date().getTime()
      }
    };
  }
}
