// Import angular
import 'angular';

import 'angular-ui-bootstrap';
import 'angular-ui-router';
import routes from './routes';


// import main css
require('../stylesheets/main.scss');

// modules:
import HomeModule from './components/home/home.module';
import DirectivesModule from './directives/directives.module';
import ServicesModule from './services/services.module';

angular.module('oxxido', [
    'ui.bootstrap',
    'ui.router',
    HomeModule.name,
    DirectivesModule.name,
    ServicesModule.name
    ])
    .config(routes);
