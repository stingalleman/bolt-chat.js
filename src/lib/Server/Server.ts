import { Socket } from 'net';
import { promises as dns } from 'dns';
import { isIP } from '../../util/isIp';
import { IBaseEvent, IError, IJoinLeave, IMessage, IMotd, IServerConfig } from '../../interfaces';
import { Bolt } from '../Bolt';
import { MessageManager } from '../Message/MessageManager';
import { BufferManager } from '../../util/BufferManager';
import { Message } from '../Message/Message';
import { JoinLeave } from './JoinLeave';
import { ServerError } from './ServerError';
import { ServerMotd } from './ServerMotd';

export class Server {
  /**
   * The socet bolt-node.js uses to talk to the server. You probably shouldn't touch this.
   */
  public connection: Socket;

  /**
   * Everything that has to do with a message.
   */
  public message: MessageManager;

  constructor(public bolt: Bolt, public config: IServerConfig) {
    this.connection = new Socket();
    this.message = new MessageManager(this);
  }

  /**
   * Connect to the bolt.chat instance.
   *
   * @param callback Callback function.
   */
  async connect(callback?: () => void): Promise<void> {
    let { host, port } = this.config;

    if (!isIP(host)) {
      const srv = await dns.resolveSrv(`_bolt._tcp.${host}`);
      const ips = await dns.resolve(srv[0].name);

      port = srv[0].port;
      [host] = ips;
    }

    await this.bolt.user.readPrivKey();
    await this.bolt.user.readPubKey();

    return await new Promise((resolve, reject) => {
      this.connection.connect(
        {
          port: port ?? 3300,
          host
        },
        () => {
          resolve();
          if (callback) callback();
        }
      );

      this.connection.on('error', reject); // TODO: check if this is valid

      const joinData: IBaseEvent<IJoinLeave> = {
        d: {
          user: {
            pubkey: this.bolt.user.pubKey.armor(),
            nick: this.bolt.config.identity.username
          }
        },
        e: {
          t: 'join',
          c: Math.round(new Date().getTime() / 1000)
        }
      };

      this.connectionHandler();

      this.connection.write(JSON.stringify(joinData));
    });
  }

  /**
   * The connection handler of this server.
   */
  private connectionHandler(): void {
    const received = new BufferManager();

    this.connection.on('data', (data) => {
      received.push(data);
      // eslint-disable-next-line no-loops/no-loops
      while (!received.isFinished()) {
        const msg = JSON.parse(received.handleData()) as IBaseEvent<unknown>;
        if (msg.e.t === 'msg') {
          const message = new Message(this, msg as IBaseEvent<IMessage>);
          this.bolt.emit('msg', message);
        } else if (msg.e.t === 'join' || msg.e.t === 'leave') {
          const joinOrLeave = new JoinLeave(this, msg as IBaseEvent<IJoinLeave>);
          this.bolt.emit(msg.e.t, joinOrLeave);
        } else if (msg.e.t === 'err') {
          this.bolt.emit('err', new ServerError(this, msg as IBaseEvent<IError>));
        } else if (msg.e.t === 'motd') {
          this.bolt.emit('motd', new ServerMotd(this, msg as IBaseEvent<IMotd>));
        }
      }
    });
  }
}
