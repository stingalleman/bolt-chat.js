import { IBaseEvent, IError } from '../../interfaces';
import { Server } from './Server';

export class ServerError {
  /**
   * The server that this error came from.
   */
  public server: Server;

  /**
   * The error.
   */
  error: Error;

  constructor(server: Server, data: IBaseEvent<IError>) {
    this.server = server;
    this.error = new Error(data.d.err);
  }
}
