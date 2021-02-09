/* eslint-disable jsdoc/require-jsdoc */

import { EventType, IBaseEvent } from '../interfaces';
import { Server } from './Server/Server';

/**
 * Manager class.
 */
export abstract class Manager {
  /**
   * Get the event data, to send to the server.
   *
   * @param event Event to send.
   * @param data Data.
   * @param time Optional time.
   */
  protected getEvent<T>(event: EventType, data: T, time?: number): IBaseEvent<T> {
    return {
      e: {
        t: event,
        c: time || Math.round(new Date().getTime() / 1000)
      },
      d: data
    };
  }

  /**
   * Write JSON to server.
   *
   * @param server Server to write the data to.
   * @param data Data to write.
   * @param callback Optional callback function.
   */
  protected writeData<T>(
    server: Server,
    data: IBaseEvent<T>,
    callback?: () => void
  ): IBaseEvent<T> {
    server.connection.write(JSON.stringify(data), () => {
      if (callback) callback();
    });

    return data;
  }
}
