import { Socket } from "net"

export class Client {
  constructor(private config: {
    username: string,
    host: string,
    port: number
  }, private readonly client?: Socket) {
    this.client = new Socket().connect({
      host: this.config.host,
      port: this.config.port
    })
  }
  
  sendMsg(msg: string): void {
    const n = Date.now().toString().slice(0, 10);
    this.client.write(
      JSON.stringify({
        e: {
          t: "msg",
          c: Number(n),
        },
        msg: {
          sent: Number(n),
          body: msg,
          user: {
            nick: this.config.username
          },
        },
      })
    );
  }
}