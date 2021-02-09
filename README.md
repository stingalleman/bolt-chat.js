# bolt-chat.js

> Node.JS library for interacting with the [bolt.chat](https://github.com/bolt-chat/bolt.chat) protocol, made in TypeScript.

## Installation

```bash
yarn add bolt-chat.js
```

## Usage

```typescript
import { Bolt } from 'bolt-chat.js';
import { join } from 'path';

const bolt = new Bolt({
  identity: {
    username: 'boltbot',
    privKeyFile: join(__dirname, '..', 'private.pgp'),
    pubKeyFile: join(__dirname, '..', 'public.pgp')
  }
});

async function bootstrap(): Promise<void> {
  await bolt.servers.join(
    {
      host: 'bolt.stingalleman.dev'
    },
    (server) => {
      console.log(`Connected to ${server.config.host}!`);
    }
  );

  bolt.on('msg', (msg) => {
    console.log(`${msg.author.nickname} said: ${msg.content}`);
  });
}

bootstrap();

```

## Author

[Sting Alleman](https://github.com/stingalleman)

### Credits & special thanks

[Stijn van der Kolk](https://github.com/stijnvdkolk/) - Has made the entire events system & the server manager. ([#10](https://github.com/stingalleman/bolt-chat.js/pull/10))

This library is inspired by [Jip Frijlink](https://github.com/jipFr)

## License

[MIT](https://github.com/stingalleman/bolt.js/blob/develop/LICENSE)
