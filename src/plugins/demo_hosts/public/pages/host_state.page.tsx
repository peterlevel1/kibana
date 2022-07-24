import React, { useCallback, FC } from 'react';
import { I18nProvider } from '@kbn/i18n/react';
import { EuiPage, EuiPageBody } from '@elastic/eui';
import { TableHostState } from '../components/table_host_state';
import { dataSource } from '../mock/datasource';
import { IHostStatePageProps, IDataSourceItem } from '../types';

const name = 'HostStatePage';

export const HostStatePage: FC<IHostStatePageProps> = ({ history }) => {
  const onClickRow = useCallback(
    (item: IDataSourceItem) => {
      if (!item.hostName) {
        return;
      }
      history.push('/' + item.id);
    },
    [history]
  );

  return (
    <I18nProvider>
      <EuiPage restrictWidth="1000px" className={name}>
        <EuiPageBody>
          <TableHostState dataSource={dataSource} onClickRow={onClickRow} />
        </EuiPageBody>
      </EuiPage>
    </I18nProvider>
  );
};
