import LogzIO from '../src/index';
import * as Nock from 'nock';
import { v4 as uuid } from 'uuid';

// Constructor
test('Succesfully instantiated for US region', () => {
  const region  = 'us';
  const token = uuid();
  const logzio = new LogzIO(region, token);
  expect(logzio).toBeInstanceOf(LogzIO);
  expect((logzio as any).token).toBe(token);
  expect((logzio as any).region).toBe(region);
  expect((logzio as any).baseUri).toBe('https://api.logz.io/');
});
test('Succesfully instantiated for EU region', () => {
  const region  = 'eu';
  const token = uuid();
  const logzio = new LogzIO(region, token);
  expect(logzio).toBeInstanceOf(LogzIO);
  expect((logzio as any).token).toBe(token);
  expect((logzio as any).region).toBe(region);
  expect((logzio as any).baseUri).toBe('https://api-eu.logz.io/');
});
test('Failed on invalid token', () => {
  const region  = 'us';
  const token = '';
  try {
    new LogzIO(region, token);
  } catch(e) {
    expect(e).toBeInstanceOf(Error);
    expect(e.message).toBe('Provide an API Token');
  }
});
test('Failed on invalid region', () => {
  const region  = uuid();
  const token = uuid();
  try {
    new LogzIO(region, token);
  } catch(e) {
    expect(e).toBeInstanceOf(Error);
    expect(e.message).toBe('Provide a valid region');
  }
});

// Axios
test('Successfully configures axios', () => {
  const region  = 'wa';
  const token = uuid();
  const logzio = new LogzIO(region, token);
  const axios = logzio.axios();
  expect(logzio).toBeInstanceOf(LogzIO);
  expect(axios).toBeInstanceOf(Function);
  expect(axios.defaults.baseURL).toBe('https://api-wa.logz.io/');
});
test('Successfully make a whoami get request', async () => {
  const region = 'us';
  const token = '4fdce24e-e468-4fe0-9106-2086b17487f2';
  const accountName = uuid();
  const logzio = new LogzIO(region, token);
  Nock((logzio as any).baseUri)
    .get('/v1/account-management/whoami')
    .reply(200, { accountName: accountName });
  const whoami = await logzio.axios()
    .get('v1/account-management/whoami');
  expect(whoami.data.accountName).toBe(accountName);
});
