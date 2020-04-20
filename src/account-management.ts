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

    /**
     * List of sub-accounts associated with the Logz.IO account
     *
     * @return  {AxiosPromise}
     */
    public list (): AxiosPromise {
        return this.LogzIO.axios().get(`${this.apiPath}/time-based-accounts`);
    }

    /**
     * Creates a Logz.IO sub-account of the account with a valid API token
     *
     * @param email {string} Account administrator's email address
     * @param accountName {string} Name of the account
     * @param retentionDays {number} Data retention time, in days
     * @param sharingObjectsAccounts {Array<number>} IDs of accounts that can access this account's data
     * @param maxDailyGB {number} Maximum daily usage, in GB
     * @param searchable {boolean} If other accounts can search this account's logs, true. Otherwise, false.
     * @param accessible {boolean} If users of the main account can access this account, true. Otherwise, false.
     * @param docSizeSetting {boolean} If document size is attached to logs, true. Otherwise, false.
     * @param utilizationSettings {Object} Settings for logging metrics on your account utilization, such as used and expected data volume at current indexing rate.
     *
     * @return  {AxiosPromise}
     */
    public create (email: string, accountName: string, retentionDays: number, sharingObjectsAccounts: Array<number>, maxDailyGB?: number, searchable?: boolean, accessible?: boolean, docSizeSetting?: boolean, utilizationSettings?: Object): AxiosPromise {
        return this.LogzIO.axios().post(`${this.apiPath}/time-based-accounts`, {
            email,
            accountName,
            retentionDays,
            sharingObjectsAccounts,
            maxDailyGB,
            searchable,
            accessible,
            docSizeSetting,
            utilizationSettings,
        });
    }
}