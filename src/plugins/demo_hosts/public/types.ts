import { History } from 'history';
import { NavigationPublicPluginStart } from '../../navigation/public';
import { ApplicationStart, CoreStart } from '../../../core/public';

export interface DemoHostsPluginSetup {
  getGreeting: () => string;
}
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface DemoHostsPluginStart {}

export interface AppPluginStartDependencies {
  navigation: NavigationPublicPluginStart;
}

export interface IDemoHostsLayoutProps {
  basename: string;
  notifications: CoreStart['notifications'];
  http: CoreStart['http'];
  navigation: NavigationPublicPluginStart;
  application: ApplicationStart;
  history: History;
}

export enum EnumHostStates {
  RED = 'red',
  YELLOW = 'yellow',
  GREEN = 'green',
}

export interface IDataSourceItem {
  id: string;
  hostName?: string;
  state?: EnumHostStates;
  description?: string;
}

export interface IHostStatePageProps {
  history: History
}

export interface IHostDetailPageProps {
  application: ApplicationStart
  id: string;
}

export interface ITableHostStateProps {
  dataSource: IDataSourceItem[];
  onClickRow: (ev: any) => void;
}

export interface IDetailParams {
  id: string;
}

export interface IHostStatusProps {
  status: EnumHostStates;
}
