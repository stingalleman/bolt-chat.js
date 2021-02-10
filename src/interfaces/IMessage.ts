export interface IMessageSent {
  msg: {
    body: string;
    sig: string;
    user: { nick: string };
  };
}

export interface IMessageReceived {
  msg: {
    body: string;
    fprint: string;
    user: { nick: string };
  };
}
