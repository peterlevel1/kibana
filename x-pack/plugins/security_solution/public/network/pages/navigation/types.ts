/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import type { DataViewBase } from '@kbn/es-query';
import type { NarrowDateRange } from '../../../common/components/ml/types';
import type { ESTermQuery } from '../../../../common/typed_json';

import type { NavTab } from '../../../common/components/navigation/types';
import type { FlowTargetSourceDest } from '../../../../common/search_strategy/security_solution/network';
import type { networkModel } from '../../store';
import type { GlobalTimeArgs } from '../../../common/containers/use_global_time';

import type { SetAbsoluteRangeDatePicker } from '../types';
import type { DocValueFields } from '../../../common/containers/source';

interface QueryTabBodyProps extends Pick<GlobalTimeArgs, 'setQuery' | 'deleteQuery'> {
  endDate: string;
  filterQuery?: string | ESTermQuery;
  indexNames: string[];
  ip?: string;
  narrowDateRange?: NarrowDateRange;
  skip: boolean;
  startDate: string;
  type: networkModel.NetworkType;
}

export type NetworkComponentQueryProps = QueryTabBodyProps & {
  docValueFields?: DocValueFields[];
};

export type IPsQueryTabBodyProps = QueryTabBodyProps & {
  flowTarget: FlowTargetSourceDest;
  indexPattern: DataViewBase;
};

export type FTQueryTabBodyProps = QueryTabBodyProps & {
  flowTarget: FlowTargetSourceDest;
};

export type IPQueryTabBodyProps = FTQueryTabBodyProps & {
  ip: string;
};

export type HttpQueryTabBodyProps = QueryTabBodyProps;

export type NetworkRoutesProps = GlobalTimeArgs & {
  docValueFields: DocValueFields[];
  type: networkModel.NetworkType;
  filterQuery?: string | ESTermQuery;
  indexPattern: DataViewBase;
  indexNames: string[];
  setAbsoluteRangeDatePicker: SetAbsoluteRangeDatePicker;
};

export enum NetworkRouteType {
  flows = 'flows',
  dns = 'dns',
  anomalies = 'anomalies',
  tls = 'tls',
  http = 'http',
  alerts = 'external-alerts',
}

export type KeyNetworkNavTabWithoutMlPermission = NetworkRouteType.dns &
  NetworkRouteType.flows &
  NetworkRouteType.http &
  NetworkRouteType.tls &
  NetworkRouteType.alerts;

type KeyNetworkNavTabWithMlPermission = KeyNetworkNavTabWithoutMlPermission &
  NetworkRouteType.anomalies;

type KeyNetworkNavTab = KeyNetworkNavTabWithoutMlPermission | KeyNetworkNavTabWithMlPermission;

export type NetworkNavTab = Record<KeyNetworkNavTab, NavTab>;

export type GetNetworkRoutePath = (
  capabilitiesFetched: boolean,
  hasMlUserPermission: boolean
) => string;
