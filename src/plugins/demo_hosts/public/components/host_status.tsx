import React from 'react';
import { IHostStatusProps } from '../types';
import './host_status.scss';

const name = 'HostStatus';

export function HostStatus({ status }: IHostStatusProps) {
  return <span className={`${name} ${status}`} />;
}
