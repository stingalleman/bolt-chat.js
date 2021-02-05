/* eslint-disable jsdoc/require-jsdoc */
import { EventType, IBaseEvent } from '../interfaces';

/**
 * Manager class.
 */
export abstract class Manager {
  constructor(private type: EventType) {}

  protected getRawEvent<T>(event?: EventType, time?: number): IBaseEvent<T> {
    return {
      e: {
        t: event || this.type,
        c: time || Math.round(new Date().getTime() / 1000)
      }
    };
  }
}
