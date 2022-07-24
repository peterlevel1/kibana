import React, { FC, useState, useEffect, useCallback } from 'react';
import { I18nProvider } from '@kbn/i18n/react';
import { i18n } from '@kbn/i18n';
import {
  EuiButton,
  EuiPage,
  EuiPageBody,
  EuiPageHeader,
} from '@elastic/eui';
import { IDataSourceItem, IHostDetailPageProps } from '../types';
import { getHostDetail } from '../services';
import './host_detail.page.scss';

const name = 'HostDetailPage';
const clsBody = `${name}-body`;
const clsHeader = `${name}-header`;
const clsHostName = `${clsHeader}-hostName`;
const clsContent = `${name}-content`;
const clsDescription = `${clsContent}-description`;

export const HostDetailPage: FC<IHostDetailPageProps> = ({ id, application }) => {
  const [ defail, setDetail ] = useState<IDataSourceItem | null>(null);

  useEffect(() => {
    getHostDetail(id).then(setDetail)
  }, [getHostDetail, setDetail, id]);

  const onGotoDashboard = useCallback(() => {
    application.navigateToUrl('/app/kibana_overview');
  }, [application]);

  return (
    <I18nProvider>
      <EuiPage restrictWidth="1000px" className={name}>
        <EuiPageBody className={clsBody}>
          <EuiPageHeader>
            <div className={clsHeader}>
              <aside>
                <div className={clsHostName}>
                  {defail?.hostName}
                </div>
              </aside>
              <main>
                <EuiButton
                  onClick={onGotoDashboard}
                >
                  {i18n.translate('demoHosts.detail.dashboard', { defaultMessage: 'dashboard' })}
                </EuiButton>
              </main>
            </div>
          </EuiPageHeader>
          <EuiPageBody>
            <div className={clsContent}>
              <p className={clsDescription}>
                {defail?.description}
              </p>
            </div>
          </EuiPageBody>
        </EuiPageBody>
      </EuiPage>
    </I18nProvider>
  );
};
