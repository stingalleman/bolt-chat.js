# bolt-chat.js

> Node.JS library for interacting with the [bolt.chat](https://github.com/bolt-chat/bolt.chat) protocol, made in TypeScript.

## Installation

```bash
yarn add bolt-chat.js
```

## Usage

```typescript
import { Bolt } from 'bolt-chat.js';

const bolt = new Bolt({
  host: '<IP HERE>',
  username: 'BoltBot'
});

async function bootstrap(): Promise<void> {
  bolt.on('msg', (data) => {
    console.log(`${data.msg.user.nick} said: ${data.msg.body}`);
  });

  await bolt.connect(() => {
    bolt.message.send('Hi there!');

    console.log('Connected!');
  });
}

bootstrap();
```

## Author

[Sting Alleman](https://github.com/stingalleman)

### Special thanks

This library is inspired by [Jip Frijlink](https://github.com/jipFr)

## License

[MIT](https://github.com/stingalleman/bolt.js/blob/develop/LICENSE)
