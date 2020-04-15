import Axios, { AxiosInstance } from 'axios';

import Users from './users';

/**
 * TypeScript SDK to interact with Logz.IO Admin API
 */
export default class {
    private baseUri: string;
    public users: Users;
    constructor(public region: string, private token: string) {
        this.baseUri = `https://api${(region === 'us') ? '' : '-' + region}.logz.io/`
        this.users = new Users(this, 1);
    }
    /**
     * Internal helper to predefine Axios requests
     *
     * @return  {AxiosInstance}  Axios object
     */
    axios () {
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