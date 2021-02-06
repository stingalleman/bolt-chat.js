/* eslint-disable jsdoc/require-jsdoc */

//
// --> https://blog.irowell.io/blog/use-a-message-buffer-stack-to-handle-data/
//

export class BufferManager {
  private delimiter: string;

  private buffer: string;

  constructor() {
    this.delimiter = '\n';
    this.buffer = '';
  }

  isFinished(): boolean {
    if (this.buffer.length === 0 || this.buffer.indexOf(this.delimiter) === -1) {
      return true;
    }
    return false;
  }

  push(data: Buffer): void {
    this.buffer += data;
  }

  getMessage(): string {
    const delimiterIndex = this.buffer.indexOf(this.delimiter);
    if (delimiterIndex !== -1) {
      const message = this.buffer.slice(0, delimiterIndex);
      this.buffer = this.buffer.replace(message + this.delimiter, '');
      return message;
    }
    return '';
  }

  handleData(): string {
    const message = this.getMessage();
    return message;
  }
}
