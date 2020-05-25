import { authenticate, subscribe } from './sf';

authenticate(
  process.env.SF_USERNAME!,
  process.env.SF_PASS!,
  process.env.SF_TOKEN!,
  process.env.SF_URL!,
  process.env.SF_CLIENT_SECRET!,
  process.env.SF_CLIENT_ID!,
)
  .then((authInfo) => {
    subscribe(authInfo.accessToken, authInfo.instanceUrl, process.env.SF_EVENT!);
  });

process.stdin.resume();
