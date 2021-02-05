export interface IMessage {
  msg: {
    sent: number;
    body: string;
    user: { nick: string };
  };
}
