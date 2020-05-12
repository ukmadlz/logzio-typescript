import Axios, { AxiosInstance } from 'axios';

import Accounts from './account-management';
import Endpoints from './endpoints';
import Users from './users-management';
import Search from './search';

/**
 * TypeScript SDK to interact with Logz.IO Admin API
 */
export default class {
    private baseUri: string;
    public users: Users;
    public accounts: Accounts;
    public endpoints: Endpoints;
    public search: Search;
    constructor(public region: string, private token: string) {
      // Include a token
      if(!token) throw Error('Provide an API Token');
      // Configure Base URI
      const allowedRegions = ['us', 'au', 'ca', 'eu', 'nl', 'wa'];
      if(!allowedRegions.includes(region)) throw Error('Provide a valid region');
      this.baseUri = `https://api${(region === 'us') ? '' : '-' + region}.logz.io/`;
      // Specific endpoints
      this.users = new Users(this, 1);
      this.accounts = new Accounts(this, 1);
      this.endpoints = new Endpoints(this, 1);
      this.search = new Search(this, 1);
    }
    /**
     * Internal helper to predefine Axios requests
     */
    axios (): AxiosInstance {
      return Axios.create({
        baseURL: this.baseUri,
        responseType: 'json',
        headers: {
          'content-type': 'application/json',
          'X-API-TOKEN': this.token,
        },
      });
    }
}