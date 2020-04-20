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
     */
    public whoami (): AxiosPromise {
      return this.LogzIO.axios().get(`${this.apiPath}/whoami`);
    }

    /**
     * List of sub-accounts associated with the Logz.IO account
     */
    public list (): AxiosPromise {
      return this.LogzIO.axios().get(`${this.apiPath}/time-based-accounts`);
    }

    /**
     * Creates a Logz.IO sub-account of the account with a valid API token
     *
     * @param email - Account administrator's email address
     * @param accountName - Name of the account
     * @param retentionDays - Data retention time, in days
     * @param sharingObjectsAccounts - IDs of accounts that can access this account's data
     * @param maxDailyGB - Maximum daily usage, in GB
     * @param searchable - If other accounts can search this account's logs, true. Otherwise, false.
     * @param accessible - If users of the main account can access this account, true. Otherwise, false.
     * @param docSizeSetting - If document size is attached to logs, true. Otherwise, false.
     * @param utilizationSettings - Settings for logging metrics on your account utilization, such as used and expected data volume at current indexing rate.
     */
    public create (email: string, accountName: string, retentionDays: number, sharingObjectsAccounts: Array<number>, maxDailyGB?: number, searchable?: boolean, accessible?: boolean, docSizeSetting?: boolean, utilizationSettings?: object): AxiosPromise {
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