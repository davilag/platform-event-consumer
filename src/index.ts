import minimist from 'minimist';
import { subscribe, sfdxAuthenticate, authenticate } from './sf';

const cliParams = minimist(process.argv.slice(2));

const event = cliParams.e || cliParams.event;
const environment = cliParams.env;
const username = cliParams.u || cliParams.username;

if (!event) {
  throw Error('Expected Platform Event in the --event parameter');
}

if (environment) {
  console.info('Authenticating environment variables...');
  authenticate(
    process.env.SF_USERNAME!,
    process.env.SF_PASS!,
    process.env.SF_TOKEN!,
    process.env.SF_URL!,
    process.env.SF_CLIENT_SECRET!,
    process.env.SF_CLIENT_ID!,
  )
    .then((auth) => {
      subscribe(auth, event);
    });
} else if (username) {
  console.info('Authenticating using SFDX config...');
  sfdxAuthenticate(username)
    .then((auth) => {
      subscribe(auth, event);
    })
    .catch(() => console.error('Couldn\'t get user information'));
} else {
  throw Error('Expected --username or --env flag to authenticate with Salesforce');
}

process.stdin.resume();
