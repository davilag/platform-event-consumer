# Platform event consumer
Script to consume platform events from a Salesforce org.

## How to install
1. Clone repository:
```sh
git clone git@github.com:davilag/platform-event-consumer.git
```
2. Install all the dependencies with yarn and build the script:
```sh
yarn install && yarn build
```

## How to run the script
The script accepts different arguments:

- `-e` | `--event`: Sets the event that we want to consume.
- `-u` | `--username` (Optional): Username of the Salesforce org from which we want to consume events. You will need to authenticate to that org first using SFDX.
- `--env` (Optional): if set, the script will get the authentication configuration from the enviromnent variables (see `.env` file).

### Consume events authenticating using SFDX
In order to consume events in this way, you will need to have SFDX installed in your machine and authorize the org you want to consume events from using any of the [auth commands](https://developer.salesforce.com/docs/atlas.en-us.sfdx_cli_reference.meta/sfdx_cli_reference/cli_reference_force_auth.htm).

```sh
yarn start --event Test_Event__e --username username@test.com
```

### Consume events using environment variables
If you don't have SFDX installed in your machine, you can authenticate to any org using [OAuth](https://help.salesforce.com/articleView?id=remoteaccess_oauth_username_password_flow.htm&type=5). All the necessary environment variables are listed in the [`.env`](https://github.com/davilag/platform-event-consumer/blob/master/.env) file.

Once you have set them up, you can just run:
```sh
yarn start --event Test_Event__e --env
```