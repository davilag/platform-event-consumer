declare module 'cometd-nodejs-client' {
  export interface CometDClientOptions {
    logLevel?: string,
    httpProxy?: HTTPProxyOptions
  }

  export interface HTTPProxyOptions {
    uri?: string,
    includes?: boolean,
    excludes?: boolean
  }

  export function adapt(options?: CometDClientOptions): void;
}
