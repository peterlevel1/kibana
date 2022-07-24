import React from 'react';
import ReactDOM from 'react-dom';
import { AppMountParameters, CoreStart } from '../../../core/public';
import { AppPluginStartDependencies } from './types';
import { DefaultLayout } from './layouts/default.layout';

export const renderApp = (
  { notifications, http, application }: CoreStart,
  { navigation }: AppPluginStartDependencies,
  { appBasePath, element, history }: AppMountParameters
) => {
  ReactDOM.render(
    <DefaultLayout
      application={application}
      basename={appBasePath}
      notifications={notifications}
      http={http}
      navigation={navigation}
      history={history}
    />,
    element
  );

  return () => ReactDOM.unmountComponentAtNode(element);
};
