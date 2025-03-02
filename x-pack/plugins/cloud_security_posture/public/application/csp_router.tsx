/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Redirect, Route, RouteComponentProps, type RouteProps, Switch } from 'react-router-dom';
import { CLOUD_SECURITY_POSTURE_BASE_PATH, type CspSecuritySolutionContext } from '..';
import { cloudPosturePages } from '../common/navigation/constants';
import type { CloudSecurityPosturePageId, CspPageNavigationItem } from '../common/navigation/types';
import { UnknownRoute } from '../components/unknown_route';
import { pageToComponentMappingNoPageTemplate } from './constants';
import { SecuritySolutionContext } from './security_solution_context';

type CspRouteProps = RouteProps & {
  path: string;
  id: CloudSecurityPosturePageId;
};

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
});

// Converts the mapping of page -> component to be of type `RouteProps` while filtering out disabled navigation items
export const getRoutesFromMapping = <T extends string>(
  navigationItems: Record<T, CspPageNavigationItem>,
  componentMapping: Record<T, RouteProps['component']>
): readonly CspRouteProps[] =>
  Object.entries(componentMapping)
    .filter(([key]) => !navigationItems[key as T].disabled)
    .map<CspRouteProps>(([key, component]) => ({
      ...navigationItems[key as T],
      component: component as CspRouteProps['component'],
    }));

// Adds the `SpyRoute` component from the security solution plugin to a CSP route
export const addSpyRouteComponentToRoute = (
  route: CspRouteProps,
  SpyRoute: ReturnType<CspSecuritySolutionContext['getSpyRouteComponent']>
): CspRouteProps => {
  const Component = route.component;
  if (!Component) {
    return route;
  }

  const newRoute = {
    ...route,
    render: (props: RouteComponentProps) => (
      <>
        <SpyRoute pageName={route.id} />
        <Component {...props} />
      </>
    ),
  };

  delete newRoute.component;
  return newRoute;
};

const securitySolutionRoutes = getRoutesFromMapping(
  cloudPosturePages,
  pageToComponentMappingNoPageTemplate
);

export interface CspRouterProps {
  routes?: readonly CspRouteProps[];
  securitySolutionContext?: CspSecuritySolutionContext;
}

export const CspRouter = ({
  routes = securitySolutionRoutes,
  securitySolutionContext,
}: CspRouterProps) => {
  const SpyRoute = securitySolutionContext
    ? securitySolutionContext.getSpyRouteComponent()
    : undefined;

  const routerElement = (
    <QueryClientProvider client={queryClient}>
      <Switch>
        {routes.map((route) => {
          const routeProps = SpyRoute ? addSpyRouteComponentToRoute(route, SpyRoute) : route;
          return <Route key={routeProps.path} {...routeProps} />;
        })}
        <Route exact path={CLOUD_SECURITY_POSTURE_BASE_PATH} component={RedirectToDashboard} />
        <Route path={`${CLOUD_SECURITY_POSTURE_BASE_PATH}/*`} component={UnknownRoute} />
      </Switch>
    </QueryClientProvider>
  );

  if (securitySolutionContext) {
    return (
      <SecuritySolutionContext.Provider value={securitySolutionContext}>
        {routerElement}
      </SecuritySolutionContext.Provider>
    );
  }

  return <>{routerElement}</>;
};

const RedirectToDashboard = () => <Redirect to={cloudPosturePages.dashboard.path} />;

// Using a default export for usage with `React.lazy`
// eslint-disable-next-line import/no-default-export
export { CspRouter as default };
