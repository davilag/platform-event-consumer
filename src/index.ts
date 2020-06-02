import { program } from 'commander';
import { subscribe, sfdxAuthenticate, authenticate } from './sf';

program
  .requiredOption('-e, --event <event>', 'Event that we want to consume')
  .option('--env', 'Flag to get the auth details from the environment variables')
  .option('-u, --username <username>', 'Username of the Salesforce org from which we want to consume events. You will need to authenticate to that org first using SFDX.');

program.parse(process.argv);

if (program.env) {
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
      subscribe(auth, program.event);
    });
} else if (program.username) {
  console.info('Authenticating using SFDX config...');
  sfdxAuthenticate(program.username)
    .then((auth) => {
      subscribe(auth, program.event);
    })
    .catch(() => console.error('Couldn\'t get user information'));
} else {
  throw Error('Expected --username or --env flag to authenticate with Salesforce');
}

process.stdin.resume();
