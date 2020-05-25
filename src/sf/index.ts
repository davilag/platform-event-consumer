import cometD from 'cometd';
import adapter from 'cometd-nodejs-client';
import { OAuth, UsernamePasswordConfig } from 'ts-force';

const authenticate = async (
  username: string,
  password: string,
  accessToken: string,
  loginURL: string,
  clientSecret: string,
  clientId: string) => {
  const config = new UsernamePasswordConfig(
    clientId,
    clientSecret,
    loginURL,
    username,
    `${password}${accessToken}`,
  );

  const oAuth = new OAuth(config);
  return oAuth.initialize();
};

const subscribe = (
  accessToken: string,
  sfURL: string,
  event: string,
) => {
  adapter.adapt();
  // Create the CometD object.
  const cometd = new cometD.CometD();

  // Configure the CometD object.
  cometd.configure({
    url: `${sfURL}/cometd/48.0/`,
    appendMessageTypeToURL: false,
    requestHeaders: { Authorization: `OAuth ${accessToken}` },
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
};
