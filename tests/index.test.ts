import LogzIO from '../src/index';
import { v4 as uuid } from 'uuid';

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
test('Successfully configures axios', () => {
  const region  = 'wa';
  const token = uuid();
  const logzio = new LogzIO(region, token);
  const axios = logzio.axios();
  expect(logzio).toBeInstanceOf(LogzIO);
  expect(axios).toBeInstanceOf(Function);
  expect(axios.defaults.baseURL).toBe('https://api-wa.logz.io/');
});
test('Fail on invalid token', () => {
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