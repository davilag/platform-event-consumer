import cometD from 'cometd';
import adapter from 'cometd-nodejs-client';
import { exec } from 'child_process';
import { OAuth, UsernamePasswordConfig } from 'ts-force';

class AuthenticationInfo {
  accessToken: string;

  sfURL: string;

  constructor(accessToken:string, sfURL:string) {
    this.accessToken = accessToken;
    this.sfURL = sfURL;
  }
}
const authenticate = async (
  username: string,
  password: string,
  accessToken: string,
  loginURL: string,
  clientSecret: string,
  clientId: string,
) => {
  const config = new UsernamePasswordConfig(
    clientId,
    clientSecret,
    loginURL,
    username,
    `${password}${accessToken}`,
  );

  const oAuth = new OAuth(config);
  const auth = await oAuth.initialize();
  return new AuthenticationInfo(auth.accessToken, auth.instanceUrl);
};

const sfdxAuthenticate = async (
  username: string,
) => new Promise<AuthenticationInfo>((resolve, reject) => {
  exec(`sfdx force:org:display --targetusername ${username} --json`, (error, stdout, stderror) => {
    if (error) {
      console.warn(error);
    }
    if (!stdout) {
      reject(stderror);
    }
    const out = JSON.parse(stdout);
    resolve(new AuthenticationInfo(out.result.accessToken, out.result.instanceUrl));
  });
});

const subscribe = (
  sfAuthInfo: AuthenticationInfo,
  event: string,
) => {
  adapter.adapt();
  // Create the CometD object.
  const cometd = new cometD.CometD();

  // Configure the CometD object.
  cometd.configure({
    url: `${sfAuthInfo.sfURL}/cometd/48.0/`,
    appendMessageTypeToURL: false,
    requestHeaders: { Authorization: `OAuth ${sfAuthInfo.accessToken}` },
  });

  // Handshake with the server.
  cometd.handshake((h) => {
    if (!h.successful) {
      console.error('Unsuccessful handshake');
    }

    console.log('Handshake succesful');
    // Subscribe to receive messages from the server.
    cometd.subscribe(`/event/${event}`, (m) => {
      const dataFromServer = m.data;
      console.log(dataFromServer);
      // Use dataFromServer.
    });
  });
};

export {
  authenticate,
  subscribe,
  sfdxAuthenticate,
};
