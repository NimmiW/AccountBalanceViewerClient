import {inject} from 'aurelia-dependency-injection';
import {ApiService} from './apiservice';

@inject(ApiService)
export class AccountService {

  constructor(apiService) {
    this.apiService = apiService;
  }
  
  getBalance(params) {
    return this.apiService.get('/api/Balance',params)
  }

  getAllAccounts(){
    return this.apiService.get('/api/BusinessAccounts/')
  }
  

}
