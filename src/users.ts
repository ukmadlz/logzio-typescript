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
     *
     * @return {AxiosPromise}  The completed request to Logz.IO API
     */
    public list (): AxiosPromise {
        return this.LogzIO.axios().get(this.apiPath)
    }
    /**
     * Creates a new user within a Logz.IO Account
     *
     * @param username {string} The username assigned
     * @param fullName {string} The users actual name
     * @param roles {Array<number>} The numeric IDs for the users roles
     * @param accountID {number} The Logz.IO account to associate the user with
     *
     * @return  {[type]}  [return description]
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
     * @param id {number} The ID for the User
     *
     * @returns {AxiosPromise} The users details from the User Management API
     */
    public get (id: number): AxiosPromise {
        return this.LogzIO.axios().get(`${this.apiPath}/${id}`)
    }

    /**
     * Updates a given user within Logz.IO
     * @param id {number} The ID for the user
     * @param username {string} The username assigned
     * @param fullName {string} The users actual name
     * @param roles {Array<number>} The numeric IDs for the users roles
     * @param accountID {number} The Logz.IO account to associate the user with
     *
     * @returns {AxiosPromise} Completed update request
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
     * @param id {number} The ID for the User
     *
     * @returns {AxiosPromise}
     */
    public delete (id: number): AxiosPromise {
        return this.LogzIO.axios().delete(`${this.apiPath}/${id}`)
    }

    /**
     * Suspends a users access
     *
     * @param id {number} The ID for the User
     *
     * @returns {AxiosPromise}
     */
    public suspend (id: number): AxiosPromise {
        return this.LogzIO.axios().post(`${this.apiPath}/suspend/${id}`)
    }

    /**
     * Unsuspends a users access
     *
     * @param id {number} The ID for the User
     *
     * @returns {AxiosPromise}
     */
    public unsuspend (id: number): AxiosPromise {
        return this.LogzIO.axios().post(`${this.apiPath}/unsuspend/${id}`)
    }
}