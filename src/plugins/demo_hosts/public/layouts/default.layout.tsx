import React, { FC, useCallback } from 'react';
import { I18nProvider } from '@kbn/i18n/react';
import { Router, Route, Switch, RouteComponentProps } from 'react-router-dom';
import { HostStatePage } from '../pages/host_state.page';
import { HostDetailPage } from '../pages/host_detail.page';
import { IDemoHostsLayoutProps, IDetailParams } from '../types';

export const DefaultLayout: FC<IDemoHostsLayoutProps> = ({application, history}) => {
  const renderHostDetailPage = useCallback(({ match }: RouteComponentProps<IDetailParams>) => {
    return <HostDetailPage application={application} id={match.params.id} />;
  }, [ application ]);

  return (
    <I18nProvider>
      <Router history={history}>
        <Switch>
          <Route path="/:id" render={renderHostDetailPage} />
          <Route exact path="/">
            <HostStatePage history={history} />
          </Route>
        </Switch>
      </Router>
    </I18nProvider>
  );
};
