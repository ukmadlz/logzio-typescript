/* eslint-disable @typescript-eslint/camelcase */
import LogzIO from '../src/index';
import Endpoints from '../src/endpoints';
import { v4 as uuid } from 'uuid';
const token = '4fdce24e-e468-4fe0-9106-2086b17487f2';
test('Succesfully instantiated class within LogzIO Class', () => {
  const region = 'us';
  const token = uuid();
  const logzio = new LogzIO(region, token);
  expect((logzio.endpoints as any).apiPath).toBe('v1/endpoints');
});
test('Succesfully instantiated class independantly default version', () => {
  const logzio = {} as LogzIO;
  const endpoints = new Endpoints(logzio, 1);
  expect((endpoints as any).apiPath).toBe('v1/endpoints');
});
test('Succesfully instantiated class independantly set to different version', () => {
  const logzio = {} as LogzIO;
  [1,2,3].forEach((version) => {
    const endpoints = new Endpoints(logzio, version);
    expect((endpoints as any).apiPath).toBe(`v${version}/endpoints`);
  });
});
test('Failed on non-numeric version', () => {
  const version = uuid();
  const logzio = {} as LogzIO;
  try {
    new Endpoints(logzio, version);
  } catch(e) {
    expect(e).toBeInstanceOf(Error);
    expect(e.message).toBe('Provide a valid version number for the User Management API');
  }
});

test('Successfully get a DI LogzIO instance', () => {
  const logzio = new LogzIO('us', uuid());
  const endpoints = new Endpoints(logzio, 4);
  const diLogzIO = endpoints.getLogzIO();
  expect(diLogzIO).toBeInstanceOf(LogzIO);
  expect(diLogzIO).toBe(logzio);
  expect((endpoints as any).LogzIO).toBe(logzio);
});

test('Successfully get a DI api path instance', () => {
  const logzio = new LogzIO('us', uuid());
  const endpoints = new Endpoints(logzio, 4);
  const diLogzIO = endpoints.getLogzIO();
  expect(diLogzIO).toBeInstanceOf(LogzIO);
  expect(diLogzIO).toBe(logzio);
  expect((endpoints as any).LogzIO).toBe(logzio);
});

test('Successfully get list of endpoints', async () => {
  const title = uuid();
  const id = Math.round((Math.random() * 1000));
  const endpointObject = {
    endpointType: 'Custom',
    id,
    title,
    description: '',
    url: `https://${title}.example.com/webhook`,
    method: 'POST',
    headers: '',
    bodyTemplate: {
      alert_title: '{{alert_title}}',
      alert_description: '{{alert_description}}',
      alert_severity: '{{alert_severity}}',
      alert_event_samples: '{{alert_event_samples}}'
    }
  };
  const logzio = {
    axios: (): any => {
      return {
        get: (): any => {
          return Promise.resolve({
            status: 200,
            statusText: 'OK',
            headers: {
            },
            config: {},
            data: [endpointObject]
          });
        }
      };
    },
  } as LogzIO;
  const endpointManagement = new Endpoints(logzio);
  const endpoints = await endpointManagement.list();
  expect(endpoints).toBeInstanceOf(Array);
  const endpoint = endpoints[0];
  expect(endpoint).toMatchObject(endpointObject);
});