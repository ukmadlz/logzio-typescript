import LogzIO from './index';

export interface IuserManagementListItem {
  id: number;
  username: string;
  fullName: string;
  accountID: number;
  roles: Array<number>;
  active: boolean;
}

export type IUserManagementListItems = Array<IuserManagementListItem>

export interface IuserId {
  id: number;
}

/**
 * The User Management API
 */
export default class Users {
    private apiPath: string;
    private allowedRoles = [
      2, // User
      3, // Admin
    ];
    constructor(private LogzIO: LogzIO, version?: number) {
      if(version && !Number(version)) throw Error('Provide a valid version number for the User Management API');
      this.apiPath = `v${version || 1}/user-management`;
    }

    /**
     * List all current users
     */
    public async list (): Promise<IUserManagementListItems> {
      return await this.LogzIO.axios().get(this.apiPath)
        .then(response => response.data);
    }

    /**
     * Creates a new user within a Logz.IO Account
     *
     * @param username - The username assigned
     * @param fullName - The users actual name
     * @param roles - The numeric IDs for the users roles
     * @param accountID - The Logz.IO account to associate the user with
     */
    public create (username: string, fullName: string, roles: number, accountID?: Array<number>): Promise<IuserId> {
      if(!this.allowedRoles.includes(roles)) throw Error('Please provide a valid role.');
      return this.LogzIO.axios().post(this.apiPath, {
        username,
        fullName,
        roles: [roles],
        accountID,
      })
        .then(response => response.data);
    }

    /**
     * Get's the details of a specific user
     *
     * @param id - The ID for the User
     */
    public get (id: number): Promise<IuserManagementListItem> {
      return this.LogzIO.axios().get(`${this.apiPath}/${id}`)
        .then(response => response.data);
    }

    /**
     * Updates a given user within Logz.IO
     * @param id - The ID for the user
     * @param username - The username assigned
     * @param fullName - The users actual name
     * @param roles - The numeric IDs for the users roles
     * @param accountID - The Logz.IO account to associate the user with
     */
    public update (id: number, username: string, fullName: string, roles: number, accountID?: Array<number>): Promise<IuserId> {
      if(!this.allowedRoles.includes(roles)) throw Error('Please provide a valid role.');
      return this.LogzIO.axios().put(`${this.apiPath}/${id}`, {
        username,
        fullName,
        roles,
        accountID,
      })
        .then(response => response.data);
    }

    /**
     * Delete's a user by the User ID
     *
     * @param id - The ID for the User
     */
    public delete (id: number): Promise<boolean> {
      return this.LogzIO.axios().delete(`${this.apiPath}/${id}`)
        .then(() => {
          return true;
        });
    }

    /**
     * Suspends a users access
     *
     * @param id - The ID for the User
     */
    public suspend (id: number): Promise<boolean> {
      return this.LogzIO.axios().post(`${this.apiPath}/suspend/${id}`)
        .then(() => {
          return true;
        });
    }

    /**
     * Unsuspends a users access
     *
     * @param id - The ID for the User
     */
    public unsuspend (id: number): Promise<boolean> {
      return this.LogzIO.axios().post(`${this.apiPath}/unsuspend/${id}`)
        .then(() => {
          return true;
        });
    }
}