import { subscribe, sfdxAuthenticate } from './sf';

sfdxAuthenticate('devorg')
  .then((auth) => {
    console.log(auth);
    subscribe(auth, 'evet');
  });

// authenticate(
//   process.env.SF_USERNAME!,
//   process.env.SF_PASS!,
//   process.env.SF_TOKEN!,
//   process.env.SF_URL!,
//   process.env.SF_CLIENT_SECRET!,
//   process.env.SF_CLIENT_ID!,
// )
//   .then((authInfo) => {
//     subscribe(authInfo, process.env.SF_EVENT!);
//   });

process.stdin.resume();
