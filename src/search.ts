import LogzIO from './index';
import { AxiosPromise } from 'axios';

/**
 * The Account Management APIs
 */
export default class Search {
  private apiPath: string;
  constructor(private LogzIO: LogzIO, version?: number) {
    this.apiPath = `v${version || 1}/search`;
  }

  /**
   * Search the account
   * @param query - The query can take any of the parameters described in the Elasticsearch Search API DSL documentation with the exceptions stated below.
   * @param dayOffset - A day offset
   * @param accountIds - IDs of the sub account to search. By default, only this account is searched.
   * @param from - Of the results found, the first result to return
   * @param size - Number of results to return
   * @param sort - Elasticsearch sorts
   * @param _source - The object includes specifies an array of strings specifying an array of fields to return.
   * @param postFilter
   * @param aggs - Field aggregations
   */
  public async query(query: unknown, dayOffset: number, accountIds: Array<number>, from: number, size: number, sort: Array<unknown>, _source: unknown, postFilter: unknown, aggs: unknown) {
    const response = await this.LogzIO.axios().post(this.apiPath, {
      query,
      from,
      size,
      sort,
      _source,
      // eslint-disable-next-line @typescript-eslint/camelcase
      post_filter: postFilter,
      aggs,
    }, {
      params: {
        dayOffset,
        accountIds
      }
    });
    return response.data;
  }
}