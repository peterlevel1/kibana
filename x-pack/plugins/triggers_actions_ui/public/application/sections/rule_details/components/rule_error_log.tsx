/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import React, { useCallback, useEffect, useState, useMemo, useRef } from 'react';
import { i18n } from '@kbn/i18n';
import datemath from '@kbn/datemath';
import {
  EuiFlexItem,
  EuiFlexGroup,
  EuiProgress,
  EuiSpacer,
  Pagination,
  EuiSuperDatePicker,
  OnTimeChangeProps,
  EuiBasicTable,
  EuiTableSortingType,
  EuiBasicTableColumn,
} from '@elastic/eui';
import { IExecutionErrors } from '@kbn/alerting-plugin/common';
import { useKibana } from '../../../../common/lib/kibana';

import { RefineSearchPrompt } from '../refine_search_prompt';
import { Rule } from '../../../../types';
import {
  ComponentOpts as RuleApis,
  withBulkRuleOperations,
} from '../../common/components/with_bulk_rule_api_operations';
import { RuleEventLogListCellRenderer } from './rule_event_log_list_cell_renderer';

const getParsedDate = (date: string) => {
  if (date.includes('now')) {
    return datemath.parse(date)?.format() || date;
  }
  return date;
};

const API_FAILED_MESSAGE = i18n.translate(
  'xpack.triggersActionsUI.sections.ruleDetails.errorLogColumn.apiError',
  {
    defaultMessage: 'Failed to fetch error log',
  }
);

const updateButtonProps = {
  iconOnly: true,
  fill: false,
};

const MAX_RESULTS = 1000;

export type RuleErrorLogProps = {
  rule: Rule;
  refreshToken?: number;
  requestRefresh?: () => Promise<void>;
} & Pick<RuleApis, 'loadActionErrorLog'>;

export const RuleErrorLog = (props: RuleErrorLogProps) => {
  const { rule, loadActionErrorLog, refreshToken } = props;

  const { uiSettings, notifications } = useKibana().services;

  // Data grid states
  const [logs, setLogs] = useState<IExecutionErrors[]>([]);
  const [pagination, setPagination] = useState<Pagination>({
    pageIndex: 0,
    pageSize: 10,
    totalItemCount: 0,
  });
  const [sort, setSort] = useState<EuiTableSortingType<IExecutionErrors>['sort']>({
    field: 'timestamp',
    direction: 'desc',
  });

  // Date related states
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [dateStart, setDateStart] = useState<string>('now-24h');
  const [dateEnd, setDateEnd] = useState<string>('now');
  const [dateFormat] = useState(() => uiSettings?.get('dateFormat'));
  const [commonlyUsedRanges] = useState(() => {
    return (
      uiSettings
        ?.get('timepicker:quickRanges')
        ?.map(({ from, to, display }: { from: string; to: string; display: string }) => ({
          start: from,
          end: to,
          label: display,
        })) || []
    );
  });

  const [actualTotalItemCount, setActualTotalItemCount] = useState<number>(0);

  const isInitialized = useRef(false);

  const isOnLastPage = useMemo(() => {
    const { pageIndex, pageSize } = pagination;
    return (pageIndex + 1) * pageSize >= MAX_RESULTS;
  }, [pagination]);

  const formattedSort = useMemo(() => {
    if (!sort) {
      return;
    }
    const { field, direction } = sort;
    return [
      {
        [field]: {
          order: direction,
        },
      },
    ];
  }, [sort]);

  const loadEventLogs = async () => {
    setIsLoading(true);
    try {
      const result = await loadActionErrorLog({
        id: rule.id,
        dateStart: getParsedDate(dateStart),
        dateEnd: getParsedDate(dateEnd),
        page: pagination.pageIndex,
        perPage: pagination.pageSize,
        sort: formattedSort,
      });
      setLogs(result.errors);
      setPagination({
        ...pagination,
        totalItemCount: Math.min(result.totalErrors, MAX_RESULTS),
      });
      setActualTotalItemCount(result.totalErrors);
    } catch (e) {
      notifications.toasts.addDanger({
        title: API_FAILED_MESSAGE,
        text: e.body.message,
      });
    }
    setIsLoading(false);
  };

  const onTimeChange = useCallback(
    ({ start, end, isInvalid }: OnTimeChangeProps) => {
      if (isInvalid) {
        return;
      }
      setDateStart(start);
      setDateEnd(end);
    },
    [setDateStart, setDateEnd]
  );

  const onRefresh = () => {
    loadEventLogs();
  };

  const columns: Array<EuiBasicTableColumn<IExecutionErrors>> = useMemo(
    () => [
      {
        field: 'timestamp',
        name: i18n.translate(
          'xpack.triggersActionsUI.sections.ruleDetails.errorLogColumn.timestamp',
          {
            defaultMessage: 'Timestamp',
          }
        ),
        render: (date: string) => (
          <RuleEventLogListCellRenderer columnId="timestamp" value={date} dateFormat={dateFormat} />
        ),
        sortable: true,
        width: '250px',
      },
      {
        field: 'type',
        name: i18n.translate('xpack.triggersActionsUI.sections.ruleDetails.errorLogColumn.type', {
          defaultMessage: 'Type',
        }),
        sortable: false,
        width: '100px',
      },
      {
        field: 'message',
        name: i18n.translate(
          'xpack.triggersActionsUI.sections.ruleDetails.errorLogColumn.message',
          {
            defaultMessage: 'Message',
          }
        ),
        sortable: false,
      },
    ],
    [dateFormat]
  );

  useEffect(() => {
    loadEventLogs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateStart, dateEnd, formattedSort, pagination.pageIndex, pagination.pageSize]);

  useEffect(() => {
    if (isInitialized.current) {
      loadEventLogs();
    }
    isInitialized.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshToken]);

  return (
    <div>
      <EuiSpacer />
      <EuiFlexGroup>
        <EuiFlexItem grow={false}>
          <EuiSuperDatePicker
            data-test-subj="ruleEventLogListDatePicker"
            width="auto"
            isLoading={isLoading}
            start={dateStart}
            end={dateEnd}
            onTimeChange={onTimeChange}
            onRefresh={onRefresh}
            dateFormat={dateFormat}
            commonlyUsedRanges={commonlyUsedRanges}
            updateButtonProps={updateButtonProps}
          />
        </EuiFlexItem>
      </EuiFlexGroup>
      <EuiSpacer />
      {isLoading && (
        <EuiProgress size="xs" color="accent" data-test-subj="ruleEventLogListProgressBar" />
      )}
      <EuiBasicTable
        data-test-subj="RuleErrorLog"
        loading={isLoading}
        items={logs ?? []}
        columns={columns}
        sorting={{ sort }}
        pagination={pagination}
        onChange={({ page: changedPage, sort: changedSort }) => {
          if (changedPage) {
            setPagination((prevPagination) => {
              if (
                prevPagination.pageIndex !== changedPage.index ||
                prevPagination.pageSize !== changedPage.size
              ) {
                return {
                  ...prevPagination,
                  pageIndex: changedPage.index,
                  pageSize: changedPage.size,
                };
              }
              return prevPagination;
            });
          }
          if (changedSort) {
            setSort((prevSort) => {
              if (prevSort?.direction !== changedSort.direction) {
                return changedSort;
              }
              return prevSort;
            });
          }
        }}
      />
      {isOnLastPage && (
        <RefineSearchPrompt
          documentSize={actualTotalItemCount}
          visibleDocumentSize={MAX_RESULTS}
          backToTopAnchor="rule_error_log_list"
        />
      )}
    </div>
  );
};

export const RuleErrorLogWithApi = withBulkRuleOperations(RuleErrorLog);

// eslint-disable-next-line import/no-default-export
export { RuleErrorLogWithApi as default };
