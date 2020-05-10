import LogzIO from './index';
import { AxiosPromise } from 'axios';

export class Custom {
  constructor (private Endpoints: Endpoints) {

  }

  /**
     * Create Custom Notification Endpoint
     *
     * @param title - Name of the endpoint
     * @param url - URL where the notification will be sent
     * @param method - The HTTP used to send the notification
     * @param description - Detailed description of the endpoint
     * @param headers - Header parameters to include, as comma-separated key-value pairs
     * @param bodyTemplate - JSON object that serves as the template for the message body.
     */
  public create (title: string, url: string, method: string, description?: string, headers?: string, bodyTemplate?: object): AxiosPromise {
    return this.Endpoints.getLogzIO().axios().post(`${this.Endpoints.getApiPath()}/custom`, {
      title,
      description,
      url,
      method,
      headers,
      bodyTemplate,
    })
      .then(response => response.data);
  }


  /**
     * Update a Custom Notification Endpoint
     *
     * @param id - The custom endpoints ID
     * @param title - Name of the endpoint
     * @param url - URL where the notification will be sent
     * @param method - The HTTP used to send the notification
     * @param description - Detailed description of the endpoint
     * @param headers - Header parameters to include, as comma-separated key-value pairs
     * @param bodyTemplate - JSON object that serves as the template for the message body.
     */
  public update (id: number, title: string, url: string, method: string, description?: string, headers?: string, bodyTemplate?: object): AxiosPromise {
    return this.Endpoints.getLogzIO().axios().put(`${this.Endpoints.getApiPath()}/custom/${id}`, {
      title,
      description,
      url,
      method,
      headers,
      bodyTemplate,
    })
      .then(response => response.data);
  }
}

/**
 * Manage Notification Endpoints within Logz.IO
 */
export default class Endpoints {
    private apiPath: string;
    public custom: Custom;
    constructor(private LogzIO: LogzIO, version?: number) {
      this.apiPath = `v${version || 1}/endpoints`;
      this.custom = new Custom(this);
    }

    /**
     * Returns an instance of LogzIO class for DI purposes
     */
    public getLogzIO(): LogzIO {
      return this.LogzIO;
    }

    /**
     * Return the API path for DI purposes
     */
    public getApiPath (): string {
      return this.apiPath;
    }

    /**
     * List all existing Notification Endpoints
     */
    public list (): AxiosPromise {
      return this.LogzIO.axios().get(this.apiPath)
        .then(response => response.data);
    }

    /**
     * Gets the details of the requested Notification Endpoint
     *
     * @param id - The ID of the Notification Endpoint
     */
    public get (id: number): AxiosPromise {
      return this.LogzIO.axios().get(`${this.apiPath}/${id}`)
        .then(response => response.data);
    }

    /**
     * Deletes the details of the requested Notification Endpoint
     *
     * @param id - The ID of the Notification Endpoint
     */
    public delete (id: number): AxiosPromise {
      return this.LogzIO.axios().delete(`${this.apiPath}/${id}`)
        .then(response => response.data);
    }
}