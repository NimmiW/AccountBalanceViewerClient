import {inject} from 'aurelia-dependency-injection';
import {bindable, bindingMode} from 'aurelia-framework';
import {Router, activationStrategy} from 'aurelia-router';
import {SharedState} from '../state/sharedstate';
import {JwtService} from '../services/jwtservice';
import {UserService} from '../services/userservice';

@inject(UserService,SharedState, JwtService, Router)
export class HeaderLayout {
  activeRoute = '';
  @bindable({defaultBindingMode: bindingMode.twoWay}) routerConfig;
  
  constructor(userService, sharedState,jwtService, router) {
    this.router = router;
    this.sharedState = sharedState;
    this.jwtService = jwtService;
    this.userService = userService;
  }
  
  routerConfigChanged(newValue, oldValue) {
    this.activeRoute = newValue.name;
  }

  logout(){
    this.userService.purgeAuth();
    this.router.navigateToRoute('home');
  }
}
