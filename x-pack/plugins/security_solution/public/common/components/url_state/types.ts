/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import type { DataViewBase } from '@kbn/es-query';
import type { FilterManager, SavedQueryService } from '@kbn/data-plugin/public';
import type { TimelineUrl } from '../../../timelines/store/timeline/model';
import type { RouteSpyState } from '../../utils/route/types';
import type { SecurityNav } from '../navigation/types';

import type { UrlStateType } from './constants';
import { CONSTANTS } from './constants';

export const ALL_URL_STATE_KEYS: KeyUrlState[] = [CONSTANTS.timeline];

export const isAdministration = (urlKey: UrlStateType): boolean => 'administration' === urlKey;

export type LocationTypes =
  | CONSTANTS.caseDetails
  | CONSTANTS.casePage
  | CONSTANTS.alertsPage
  | CONSTANTS.hostsDetails
  | CONSTANTS.hostsPage
  | CONSTANTS.kubernetesPage
  | CONSTANTS.networkDetails
  | CONSTANTS.networkPage
  | CONSTANTS.overviewPage
  | CONSTANTS.timelinePage
  | CONSTANTS.unknown;

export interface UrlState {
  [CONSTANTS.timeline]: TimelineUrl;
}
export type KeyUrlState = keyof UrlState;

export type ValueUrlState = UrlState[keyof UrlState];

export interface UrlStateProps {
  navTabs: SecurityNav;
  indexPattern?: DataViewBase;
  mapToUrlState?: (value: string) => UrlState;
  onChange?: (urlState: UrlState, previousUrlState: UrlState) => void;
  onInitialize?: (urlState: UrlState) => void;
}

export type UrlStateContainerPropTypes = RouteSpyState & UrlStateStateToPropsType & UrlStateProps;

export interface UrlStateStateToPropsType {
  urlState: UrlState;
}

export interface PreviousLocationUrlState {
  pathName: string | undefined;
  pageName: string | undefined;
  urlState: UrlState;
  search: string | undefined;
}

export interface UrlStateToRedux {
  urlKey: KeyUrlState;
  newUrlStateString: string;
}

export interface SetInitialStateFromUrl {
  filterManager: FilterManager;
  indexPattern: DataViewBase | undefined;
  pageName: string;
  savedQueries: SavedQueryService;
  urlStateToUpdate: UrlStateToRedux[];
}

export interface ReplaceStateInLocation {
  urlStateToReplace: unknown;
  urlStateKey: string;
}
