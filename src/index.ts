import { program } from 'commander';
import {
  subscribe, sfdxAuthenticate, authenticate, AuthenticationInfo,
} from './sf';

program
  .requiredOption('-e, --event <event>', 'Event that we want to consume')
  .option('--env', 'Flag to get the auth details from the environment variables')
  .option('-u, --username <username>', 'Username of the Salesforce org from which we want to consume events. You will need to authenticate to that org first using SFDX.');

program.parse(process.argv);
const authPromise: Promise<AuthenticationInfo> = program.env
  ? authenticate(
    process.env.SF_USERNAME!,
    process.env.SF_PASS!,
    process.env.SF_TOKEN!,
    process.env.SF_URL!,
    process.env.SF_CLIENT_SECRET!,
    process.env.SF_CLIENT_ID!,
  )
  : sfdxAuthenticate(program.username);

authPromise
  .then((auth) => {
    subscribe(auth, program.event);
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

process.stdin.resume();
