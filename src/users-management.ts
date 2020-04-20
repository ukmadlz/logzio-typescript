import LogzIO from './index';
import { AxiosPromise } from 'axios';

/**
 * The User Management API
 */
export default class Users {
    private apiPath: string;
    constructor(private LogzIO: LogzIO, version?: number) {
      this.apiPath = `v${version}/user-management`;
    }
    /**
     * List all current users
     */
    public list (): AxiosPromise {
      return this.LogzIO.axios().get(this.apiPath);
    }
    /**
     * Creates a new user within a Logz.IO Account
     *
     * @param username - The username assigned
     * @param fullName - The users actual name
     * @param roles - The numeric IDs for the users roles
     * @param accountID - The Logz.IO account to associate the user with
     */
    public create (username: string, fullName: string, roles: number, accountID?: Array<number>): AxiosPromise {
      return this.LogzIO.axios().post(this.apiPath, {
        username,
        fullName,
        roles,
        accountID,
      });
    }

    /**
     * Get's the details of a specific user
     *
     * @param id - The ID for the User
     */
    public get (id: number): AxiosPromise {
      return this.LogzIO.axios().get(`${this.apiPath}/${id}`);
    }

    /**
     * Updates a given user within Logz.IO
     * @param id - The ID for the user
     * @param username - The username assigned
     * @param fullName - The users actual name
     * @param roles - The numeric IDs for the users roles
     * @param accountID - The Logz.IO account to associate the user with
     */
    public update (id: number, username: string, fullName: string, roles: number, accountID?: Array<number>): AxiosPromise {
      return this.LogzIO.axios().put(`${this.apiPath}/${id}`, {
        username,
        fullName,
        roles,
        accountID,
      });
    }

    /**
     * Delete's a user by the User ID
     *
     * @param id - The ID for the User
     */
    public delete (id: number): AxiosPromise {
      return this.LogzIO.axios().delete(`${this.apiPath}/${id}`);
    }

    /**
     * Suspends a users access
     *
     * @param id - The ID for the User
     */
    public suspend (id: number): AxiosPromise {
      return this.LogzIO.axios().post(`${this.apiPath}/suspend/${id}`);
    }

    /**
     * Unsuspends a users access
     *
     * @param id - The ID for the User
     */
    public unsuspend (id: number): AxiosPromise {
      return this.LogzIO.axios().post(`${this.apiPath}/unsuspend/${id}`);
    }
}