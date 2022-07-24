import './index.scss';

import { DemoHostsPlugin } from './plugin';

// This exports static code and TypeScript types,
// as well as, Kibana Platform `plugin()` initializer.
export function plugin() {
  return new DemoHostsPlugin();
}
export { DemoHostsPluginSetup, DemoHostsPluginStart } from './types';
