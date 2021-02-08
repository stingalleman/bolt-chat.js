import { Message } from '../lib/Message/Message';
import { JoinLeave } from '../lib/Server/JoinLeave';
import { ServerError } from '../lib/Server/ServerError';
import { ServerMotd } from '../lib/Server/ServerMotd';

export interface IEvents {
  msg: (msg: Message) => void;
  join: (data: JoinLeave) => void;
  leave: (data: JoinLeave) => void;
  err: (error: ServerError) => void;
  motd: (data: ServerMotd) => void;
}
