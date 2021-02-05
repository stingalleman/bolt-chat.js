import { Bolt } from '../Bolt';
import { Manager } from '../Manager';

/**
 * Everything to do with a user.
 */
export class UserManager extends Manager {
  constructor(private bolt: Bolt) {
    super('msg');
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
}
