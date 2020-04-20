import LogzIO from './index';
import { AxiosPromise } from 'axios';

/**
 * The Account Management APIs
 */
export default class Accounts {
    private apiPath: string;
    constructor(private LogzIO: LogzIO, version?: number) {
        this.apiPath = `v${version}/account-management`;
    }

    /**
     * Returns the accountName of the API Token
     * 
     * @returns {AxiosPromise}
     */
    public whoami (): AxiosPromise {
        return this.LogzIO.axios().get(`${this.apiPath}/whoami`);
    }
}