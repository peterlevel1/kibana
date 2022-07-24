import { i18n } from '@kbn/i18n';
import { AppMountParameters, CoreSetup, CoreStart, Plugin, DEFAULT_APP_CATEGORIES } from '../../../core/public';
import { DemoHostsPluginSetup, DemoHostsPluginStart, AppPluginStartDependencies } from './types';
import { PLUGIN_NAME } from '../common';

export class DemoHostsPlugin implements Plugin<DemoHostsPluginSetup, DemoHostsPluginStart> {
  public setup(core: CoreSetup): DemoHostsPluginSetup {
    // Register an application into the side navigation menu
    core.application.register({
      id: 'demoHosts',
      title: i18n.translate('demoHosts.title', {
        defaultMessage: 'Atlastix infrastructure'
      }),
      category: DEFAULT_APP_CATEGORIES.management,
      async mount(params: AppMountParameters) {
        // Load application bundle
        const { renderApp } = await import('./application');
        // Get start services as specified in kibana.json
        const [coreStart, depsStart] = await core.getStartServices();
        // Render the application
        return renderApp(coreStart, depsStart as AppPluginStartDependencies, params);
      },
    });

    // Return methods that should be available to other plugins
    return {
      getGreeting() {
        return i18n.translate('demoHosts.greetingText', {
          defaultMessage: 'Hello from {name}!',
          values: {
            name: PLUGIN_NAME,
          },
        });
      },
    };
  }

  public start(core: CoreStart): DemoHostsPluginStart {
    return {};
  }

  public stop() {}
}
