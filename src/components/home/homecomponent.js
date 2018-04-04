import {BindingEngine} from 'aurelia-framework';
import {inject} from 'aurelia-dependency-injection';
import {SharedState} from '../../shared/state/sharedstate';
import {AccountService} from "../../shared/services/accountservice";
import moment from 'moment';

@inject(SharedState, BindingEngine,AccountService)
export class AccountComponent {
  accounts = [];
  
  constructor(sharedState, bindingEngine, accountService) {
    this.sharedState = sharedState;
    this.bindingEngine = bindingEngine;
    this.accountService = accountService;
    this.year = moment().year();
    this.month = moment().month();
  }

  attached() {
    if(this.sharedState.currentUser.role=='USER'){
      this.getBalance(this.year, this.month);
    }
    
  }
  
  getBalance(year, month) {
    if(year && month) {
      let params = {
        year: year,
        month: month
      };
  
      this.accountService.getBalance(params)
        .then(response => {
          this.accounts = response;
          this.monthString =  moment(month+1, 'MM').format('MMMM');
        })
    }
    
  }

}
