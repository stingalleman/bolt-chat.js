/* eslint-disable jsdoc/require-jsdoc */
import { Socket } from 'net';
import { EventType, IBaseEvent } from '../interfaces';

/**
 * Manager class.
 */
export abstract class Manager {
  constructor(private type: EventType, private connection: Socket) {}

  protected getEvent<T>(event?: EventType, time?: number): IBaseEvent<T> {
    return {
      e: {
        t: event || this.type,
        c: time || Math.round(new Date().getTime() / 1000)
      }
    };
  }

  /**
   * Write JSON to server.
   *
   * @param data Data to write.
   * @param callback Optional callback function.
   */
  protected writeJson<T>(data: IBaseEvent<T>, callback?: () => void): IBaseEvent<T> {
    this.connection.write(JSON.stringify(data), () => {
      if (callback) callback();
    });

    return data;
  }
}
