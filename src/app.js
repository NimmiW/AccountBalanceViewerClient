import {inject} from 'aurelia-dependency-injection';
import {UserService} from './shared/services/userservice';

@inject(UserService)
export class App {
  
  constructor(userService) {
    this.userService = userService;
  }
  
  configureRouter(config, router) {
    config.title = 'Account Balance Viewer';
    config.map([
      {route: ['', 'home'], moduleId: 'components/home/homecomponent', name:'home', title: 'home'},
      {route: ['login'], moduleId: 'components/auth/authcomponent', name: 'login', title: 'Sign in'},
      {route: ['register'], moduleId: 'components/auth/authcomponent', name:'register', title: 'Register'},
      {route: ['updatebalance'], moduleId: 'components/updatebalance/updatebalancecomponent', name:'updatebalance', title: 'updatebalance'},
      {route: ['reports'], moduleId: 'components/report/reportcomponent', name:'reports', title: 'reports'}
    ]);

    config.mapUnknownRoutes('components/home/homecomponent');
    
    this.router = router;
  }
  
  attached() {
    
  }
}
