import LogzIO from './index';
import { AxiosPromise } from 'axios';

interface IseverityThresholdTier {
  severity: string;
  threshold: number;
}

type IseverityThresholdTiers = Array<IseverityThresholdTier>

export default class Alerts {
  private apiPath: string;
  constructor(private LogzIO: LogzIO, version?: number) {
    this.apiPath = `v${version || 1}/alerts`;
  }

  public create (
    title: string,
    description: string,
    queryString: string,
    filter: string,
    operation: string,
    searchTimeFrameMinutes: number,
    notificationEmails: Array<string>,
    isEnabled: boolean,
    suppressNotificationsMinutes: number,
    tags: Array<string>,
    valueAggregationType: string,
    valueAggregationField: string,
    groupByAggregationField: Array<string>,
    alertNotificationEndpoints: Array<number>,
    severityThresholdTiers: IseverityThresholdTiers): AxiosPromise {
    return this.LogzIO.axios().post(this.apiPath, {
      title,
      description,
      // eslint-disable-next-line @typescript-eslint/camelcase
      query_string: queryString,
      filter,
      operation,
      searchTimeFrameMinutes,
      notificationEmails,
      isEnabled,
      suppressNotificationsMinutes,
      tags,
      valueAggregationType,
      valueAggregationField,
      groupByAggregationField,
      alertNotificationEndpoints,
      severityThresholdTiers
    })
      .then(response => response.data);
  }
}