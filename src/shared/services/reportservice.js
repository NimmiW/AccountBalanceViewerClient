import {inject} from 'aurelia-dependency-injection';
import {ApiService} from './apiservice';

@inject(ApiService)
export class ReportService {

  constructor(apiService) {
    this.apiService = apiService;
  }
  
  getReport(params) {
    return this.apiService.get('/api/Report', params)
  }
}
