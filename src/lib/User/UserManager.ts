import * as pgp from 'openpgp';
import fs from 'fs';
import { Bolt } from '../Bolt';
import { Manager } from '../Manager';

/**
 * Everything to do with a user.
 */
export class UserManager extends Manager {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  pubKey: pgp.key.Key; // TODO

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  privKey: pgp.key.Key; // TODO

  constructor(private bolt: Bolt) {
    super();
  }

  /**
   * @deprecated
   * Set new username.
   *
   * @param username Username to set.
   */
  setUsername(username: string): void {
    this.bolt.config.identity.username = username;
  }

  /**
   * Read the public key file.
   */
  async readPubKey(): Promise<pgp.key.Key> {
    const importedPubKey = await pgp.key.readArmored(
      await fs.promises.readFile(this.bolt.config.identity.pubKeyFile, 'utf-8')
    );
    if (importedPubKey.err) throw importedPubKey.err[0];

    [this.pubKey] = importedPubKey.keys;
    return importedPubKey.keys[0];
  }

  /**
   * Read the private key file.
   */
  async readPrivKey(): Promise<pgp.key.Key> {
    const importedPrivKey = await pgp.key.readArmored(
      await fs.promises.readFile(this.bolt.config.identity.privKeyFile, 'utf-8')
    );
    if (importedPrivKey.err) throw importedPrivKey.err[0];

    [this.privKey] = importedPrivKey.keys;
    return importedPrivKey.keys[0];
  }

  /**
   * Get signing key.
   *
   * @param msg Message to sign.
   */
  async getSign(msg: string): Promise<string> {
    if (this.privKey) {
      const signKey = await pgp.sign({
        message: pgp.cleartext.fromText(msg),
        privateKeys: this.privKey,
        detached: true,
        armor: true
      });

      return signKey.signature;
    }
    return 'oop'; // TODO
  }
}
