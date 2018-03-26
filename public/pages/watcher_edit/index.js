import { uiModules } from 'ui/modules';
import { Notifier } from 'ui/notify/notifier';
import routes from 'ui/routes';

import './components/threshold_watcher_edit';
import './components/title_panel_watcher_edit';
import './components/condition_panel_watcher_edit';
import './components/action_panel_watcher_edit';

import template from './watcher_edit.html';
import controller from './watcher_edit';

routes
  .when('/watcher/:id/edit')
  .when('/watcher/:type/new')
  .defaults(/watcher\/(:id\/edit|:type\/new)/, {
    template,
    controller,
    controllerAs: 'watcherEdit',
    bindToController: true,
    resolve: {
      watcher: function ($injector) {
        const $route = $injector.get('$route');
        const kbnUrl = $injector.get('kbnUrl');
        const watcherService = $injector.get('Watcher');
        const notifier = new Notifier({ location: 'Watcher' });

        const watcherId = $route.current.params.id;
        return watcherService.get(watcherId).catch(function (err) {
          notifier.error(err);
          kbnUrl.redirect('/');
        });
      },
    },
  });
