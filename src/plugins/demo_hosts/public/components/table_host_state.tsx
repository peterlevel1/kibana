import React, { useCallback, FC, MouseEvent } from 'react';
import { i18n } from '@kbn/i18n';
import { EuiBasicTable } from '@elastic/eui';
import { HostStatus } from './host_status';
import { EnumHostStates, ITableHostStateProps } from '../types';
import './table_host_state.scss';

const name = 'TableHostState';
const columns = [
  {
    field: 'hostName',
    name: i18n.translate('demoHosts.tableFieldHostName', {
      defaultMessage: 'Host Name',
    }),
    width: '80%',
    align: 'left',
    render(value: any) {
      return value;
    },
  },
  {
    field: 'state',
    name: i18n.translate('demoHosts.tableFieldState', {
      defaultMessage: 'state',
    }),
    width: '20%',
    align: 'center',
    render(value: EnumHostStates) {
      return <HostStatus status={value} />;
    },
  },
];

export const TableHostState: FC<ITableHostStateProps> = ({ dataSource, onClickRow }) => {

  const getRowProps = useCallback((item) => {
    return {
      key: item.id,
      onClick(ev: MouseEvent<HTMLElement>) {
        ev.preventDefault();
        onClickRow(item);
      },
    };
  }, [onClickRow]);

  return (
    <EuiBasicTable
      className={name}
      // @ts-ignore
      columns={columns}
      items={dataSource}
      rowProps={getRowProps}
    />
  );
};
