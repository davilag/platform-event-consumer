import { sfdxAuthenticate } from '../index';

const accessToken = '12345678';
const authURL = 'https:test.com';
jest.mock('child_process', () => ({
  exec: jest.fn().mockImplementation((cmd, callback) => {
    if (cmd.includes('fail')) {
      callback(null, '', 'error');
    }
    console.log(cmd);
    const out = {
      status: 0,
      result: {
        username: 'username@test.com',
        id: '00D4J0000002ZaMUAU',
        accessToken,
        instanceUrl: authURL,
        clientId: 'TestPlatform',
      },
    };
    callback(null, JSON.stringify(out), null);
  }),
}));

describe('Authenticate SFDX', () => {
  it('It should return auth token and auth URL', async () => {
    const authInfo = await sfdxAuthenticate('test');
    expect(authInfo.sfURL).toBe(authURL);
    expect(authInfo.accessToken).toBe(accessToken);
  });

  it('It should return a failure', async () => {
    try {
      await sfdxAuthenticate('fail');
      expect(1).toBe(2);
    } catch (exception) {
      expect(exception).toBe('error');
    }
  });
});
