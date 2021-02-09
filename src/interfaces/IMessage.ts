export interface IMessage {
  msg: {
    body: string;
    sig: string;
    user: { username: string };
  };
}
