export interface IConfig {
  host: string;
  port?: number;
  identity: {
    username: string;
    pubKeyFile: string;
    privKeyFile: string;
  };
}
