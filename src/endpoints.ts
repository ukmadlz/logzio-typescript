import LogzIO from './index';
import { AxiosPromise } from 'axios';

/**
 * Manage Notification Endpoints within Logz.IO
 */
export default class Endpoints {
    private apiPath: string;
    public custom: Custom;
    constructor(private LogzIO: LogzIO, version?: number) {
        this.apiPath = `v${version}/endpoints`;
        this.custom = new Custom(this);
    }

    public getLogzIO() {
        return this.LogzIO;
    }

    public getApiPath () {
        return this.apiPath;
    }

    /**
     * List all existing Notification Endpoints
     *
     * @return  {AxiosPromise}
     */
    public list (): AxiosPromise {
        return this.LogzIO.axios().get(this.apiPath)
    }

    /**
     * Gets the details of the requested Notification Endpoint
     * 
     * @param id {number} The ID of the Notification Endpoint
     * 
     * @returns {AxiosPromise}
     */
    public get (id: number): AxiosPromise {
        return this.LogzIO.axios().get(`${this.apiPath}/${id}`)
    }

    /**
     * Deletes the details of the requested Notification Endpoint
     * 
     * @param id {number} The ID of the Notification Endpoint
     * 
     * @returns {AxiosPromise}
     */
    public delete (id: number): AxiosPromise {
        return this.LogzIO.axios().delete(`${this.apiPath}/${id}`)
    }
}

class Custom {
    constructor (private Endpoints: Endpoints) {

    }

    /**
     * Create Custom Notification Endpoint
     *
     * @param title {string} Name of the endpoint
     * @param url {string} URL where the notification will be sent
     * @param method {string} The HTTP used to send the notification
     * @param description {string} Detailed description of the endpoint
     * @param headers {string} Header parameters to include, as comma-separated key-value pairs
     * @param bodyTemplate {object} JSON object that serves as the template for the message body.
     *
     * @return  {AxiosPromise}
     */
    public create (title: string, url: string, method: string, description?: string, headers?: string, bodyTemplate?: object) {
        return this.Endpoints.getLogzIO().axios().post(`${this.Endpoints.getApiPath()}/custom`, {
            title,
            description,
            url,
            method,
            headers,
            bodyTemplate,
        })
    }


    /**
     * Update a Custom Notification Endpoint
     *
     * @param id {number} The custom endpoints ID
     * @param title {string} Name of the endpoint
     * @param url {string} URL where the notification will be sent
     * @param method {string} The HTTP used to send the notification
     * @param description {string} Detailed description of the endpoint
     * @param headers {string} Header parameters to include, as comma-separated key-value pairs
     * @param bodyTemplate {object} JSON object that serves as the template for the message body.
     *
     * @return  {AxiosPromise}
     */
    public update (id: number, title: string, url: string, method: string, description?: string, headers?: string, bodyTemplate?: object) {
        return this.Endpoints.getLogzIO().axios().put(`${this.Endpoints.getApiPath()}/custom/${id}`, {
            title,
            description,
            url,
            method,
            headers,
            bodyTemplate,
        })
    }
}