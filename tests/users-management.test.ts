/* eslint-disable @typescript-eslint/no-explicit-any */
import LogzIO from '../src/index';
import Users from '../src/users-management';
import { v4 as uuid } from 'uuid';

const token = '4fdce24e-e468-4fe0-9106-2086b17487f2';
test('Succesfully instantiated class within LogzIO Class', () => {
  const region = 'us';
  const token = uuid();
  const logzio = new LogzIO(region, token);
  expect((logzio.users as any).apiPath).toBe('v1/user-management');
});
test('Succesfully instantiated class independantly default version', () => {
  const logzio = {} as LogzIO;
  const user = new Users(logzio);
  expect((user as any).apiPath).toBe('v1/user-management');
});
test('Succesfully instantiated class independantly set to different version', () => {
  const logzio = {} as LogzIO;
  [1,2,3].forEach((version) => {
    const user = new Users(logzio, version);
    expect((user as any).apiPath).toBe(`v${version}/user-management`);
  });
});
test('Failed on non-numeric version', () => {
  const version = uuid();
  const logzio = {} as LogzIO;
  try {
    new Users(logzio, version);
  } catch(e) {
    expect(e).toBeInstanceOf(Error);
    expect(e.message).toBe('Provide a valid version number for the User Management API');
  }
});

test('Successfully get list of users', async () => {
  const user1uuid = uuid();
  const accountID = Math.round((Math.random() * 1000));
  const user1Object = {
    id: Math.round((Math.random() * 100)),
    username: `${user1uuid}@logz.io`,
    fullName: user1uuid,
    accountID,
    roles: [3],
    active: true
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
            data: [
              user1Object,
              {
                id: Math.round((Math.random() * 100)),
                username: `${uuid()}@logz.io`,
                fullName: uuid(),
                accountID,
                roles: [3],
                active: true
              }
            ]
          });
        }
      };
    },
  } as LogzIO;
  const userManagement = new Users(logzio);
  const users = await userManagement.list();
  const user1 = users.find((user) => user.fullName === user1uuid);
  expect(user1).toMatchObject(user1Object);
});
test('Successfully get a specific users details', async () => {
  const userId = Math.round((Math.random() * 1000));
  const userName = uuid();
  const accountID = Math.round((Math.random() * 1000));
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
            data:{
              id: userId,
              username: `${userName}@logz.io`,
              fullName: userName,
              accountID,
              roles: [ 3 ],
              active: true
            }
          });
        }
      };
    }
  } as LogzIO;
  const userManagement = new Users(logzio);
  const user = await userManagement.get(userId);
  expect(user.id).toBe(userId);
});
test('Successfully delete a specific user', async() => {
  const userId = Math.round((Math.random() * 1000));
  const logzio = {
    axios: (): any => {
      return {
        delete: (): any => {
          return Promise.resolve({
            status: 200,
            statusText: 'OK',
            headers: {
            },
            config: {},
            data:{}});
        }
      };
    }
  } as LogzIO;
  const userManagement = new Users(logzio);
  const userDelete = await userManagement.delete(userId);
  expect(userDelete).toBe(true);
});
test('Successfully suspend a specific user', async () => {
  const userId = Math.round((Math.random() * 1000));
  const logzio = {
    axios: (): any => {
      return {
        post: (): any => {
          return Promise.resolve({
            status: 200,
            statusText: 'OK',
            headers: {
            },
            config: {},
            data:{}});
        }
      };
    }
  } as LogzIO;
  const userManagement = new Users(logzio);
  const userSuspended = await userManagement.suspend(userId);
  expect(userSuspended).toBe(true);
});
test('Successfully unsuspend a specific user', async () => {
  const userId = Math.round((Math.random() * 1000));
  const logzio = {
    axios: (): any => {
      return {
        post: (): any => {
          return Promise.resolve({
            status: 200,
            statusText: 'OK',
            headers: {
            },
            config: {},
            data:{}});
        }
      };
    }
  } as LogzIO;
  const userManagement = new Users(logzio);
  const userUnsuspended = await userManagement.unsuspend(userId);
  expect(userUnsuspended).toBe(true);
});