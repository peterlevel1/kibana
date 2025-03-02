/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import type { EuiDataGridColumnCellActionProps } from '@elastic/eui';
import React, { useMemo } from 'react';

import type { TimelineNonEcsData } from '@kbn/timelines-plugin/common/search_strategy';
import type { DataProvider } from '@kbn/timelines-plugin/common/types';
import { getPageRowIndex } from '@kbn/timelines-plugin/public';
import { useGetMappedNonEcsValue } from '../../../timelines/components/timeline/body/data_driven_columns';
import { IS_OPERATOR } from '../../../timelines/components/timeline/data_providers/data_provider';
import { escapeDataProviderId } from '../../components/drag_and_drop/helpers';
import { EmptyComponent, useKibanaServices } from './helpers';

export const getAddToTimelineCellAction = ({
  data,
  pageSize,
}: {
  data?: TimelineNonEcsData[][];
  pageSize: number;
}) =>
  data && data.length > 0
    ? function AddToTimeline({ rowIndex, columnId, Component }: EuiDataGridColumnCellActionProps) {
        const { timelines } = useKibanaServices();
        const pageRowIndex = getPageRowIndex(rowIndex, pageSize);
        const rowData = useMemo(() => {
          return {
            data: data[pageRowIndex],
            fieldName: columnId,
          };
        }, [pageRowIndex, columnId]);

        const value = useGetMappedNonEcsValue(rowData);

        const addToTimelineButton = useMemo(
          () => timelines.getHoverActions().getAddToTimelineButton,
          [timelines]
        );

        const dataProvider: DataProvider[] = useMemo(
          () =>
            value?.map((x) => ({
              and: [],
              enabled: true,
              id: `${escapeDataProviderId(columnId)}-row-${rowIndex}-col-${columnId}-val-${x}`,
              name: x,
              excluded: false,
              kqlQuery: '',
              queryMatch: {
                field: columnId,
                value: x,
                operator: IS_OPERATOR,
              },
            })) ?? [],
          [columnId, rowIndex, value]
        );
        const addToTimelineProps = useMemo(() => {
          return {
            Component,
            dataProvider,
            field: columnId,
            ownFocus: false,
            showTooltip: false,
          };
        }, [Component, columnId, dataProvider]);

        // data grid expects each cell action always return an element, it crashes if returns null
        return pageRowIndex >= data.length ? (
          <>{EmptyComponent}</>
        ) : (
          <>{addToTimelineButton(addToTimelineProps)}</>
        );
      }
    : EmptyComponent;
