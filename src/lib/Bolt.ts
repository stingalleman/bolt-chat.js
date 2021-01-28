import { Socket } from 'net';
import { IMessage, IConfig, EventType, IJoinLeave, IError, IMotd } from '../interfaces';
import { MessageManager } from './Message/MessageManager';

/**
 * Main Bolt class.
 */
export class Bolt {
  /**
   * Everything that has to do with a message.
   */
  message: MessageManager;

  /**
   * The socet bolt-node.js uses to talk to the server. You probably shouldn't touch this.
   */
  connection: Socket;

  protected config: IConfig;

  /**
   * @param config Config.
   */
  constructor(config: IConfig) {
    this.config = config;
    this.connection = new Socket();
    this.message = new MessageManager(this.config, this.connection);
  }

  /**
   * Connect to the bolt.chat instance.
   *
   * @param callback Callback function.
   */
  async connect(callback?: () => void): Promise<void> {
    return await new Promise((resolve, reject) => {
      this.connection.connect(
        {
          port: this.config.port,
          host: this.config.host
        },
        () => {
          resolve();
          if (callback) callback();
        }
      );

      this.connection.on('error', reject); // TODO: check if this is valid

      const time = Math.round(new Date().getTime() / 1000);
      const joinData: IJoinLeave = {
        user: {
          nick: this.config.username
        },
        e: {
          t: 'join',
          c: time
        }
      };

      this.connection.write(JSON.stringify(joinData));
    });
  }

  public on(event: 'msg', callback: (data: IMessage) => void): void;

  public on(event: 'join', callback: (data: IJoinLeave) => void): void;

  public on(event: 'leave', callback: (data: IJoinLeave) => void): void;

  public on(event: 'err', callback: (data: IError) => void): void;

  public on(event: 'motd', callback: (data: IMotd) => void): void;

  /**
   * Execute the callback if event is fired.
   *
   * @param event Event to listen to.
   * @param callback Callback function.
   */
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
  public on(event: EventType, callback: (data: any) => void): void {
    this.connection.on('data', (d) => {
      const data = JSON.parse(d.toString());
      if (data.e.t !== event) return;
      callback(data);
    });
  }
}
