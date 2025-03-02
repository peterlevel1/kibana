/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import type { ComponentType, ReactNode } from 'react';
import type { UnifiedSearchPublicPluginStart } from '@kbn/unified-search-plugin/public';
import type { DataPublicPluginSetup, DataPublicPluginStart } from '@kbn/data-plugin/public';
import type { ChartsPluginStart } from '@kbn/charts-plugin/public';
import type { DiscoverStart } from '@kbn/discover-plugin/public';
import type { CloudSecurityPosturePageId } from './common/navigation/types';

/**
 * The cloud security posture's public plugin setup interface.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface CspClientPluginSetup {}

/**
 * The cloud security posture's public plugin start interface.
 */
export interface CspClientPluginStart {
  /** Gets the cloud security posture router component for embedding in the security solution. */
  getCloudSecurityPostureRouter(): ComponentType<{
    securitySolutionContext: CspSecuritySolutionContext;
  }>;
}

export interface CspClientPluginSetupDeps {
  // required
  data: DataPublicPluginSetup;

  // optional
}

export interface CspClientPluginStartDeps {
  // required
  data: DataPublicPluginStart;
  unifiedSearch: UnifiedSearchPublicPluginStart;
  charts: ChartsPluginStart;
  discover: DiscoverStart;
  // optional
}

/**
 * Methods exposed from the security solution to the cloud security posture application.
 */
export interface CspSecuritySolutionContext {
  /** Gets the `FiltersGlobal` component for embedding a filter bar in the security solution application. */
  getFiltersGlobalComponent: () => ComponentType<{ children: ReactNode }>;
  /** Gets the `SpyRoute` component for navigation highlighting and breadcrumbs. */
  getSpyRouteComponent: () => ComponentType<{ pageName?: CloudSecurityPosturePageId }>;
}
