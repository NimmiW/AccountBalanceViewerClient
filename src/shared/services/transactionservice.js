import {inject} from 'aurelia-dependency-injection';
import {ApiService} from './apiservice';

@inject(ApiService)
export class TransactionService {

  constructor(apiService) {
    this.apiService = apiService;
  }

  getAll(params) { //year and month
    return this.apiService.get('/api/Transactions', params);
  }
  

  get(slug) {
    return this.apiService.get('/api/transactions/' + slug)
      .then(data => data.transaction)
  }
  
  destroy(slug) {
    return this.apiService.delete('/api/transactions/' + slug)
  }
  
  save(transaction) {
    if (transaction.slug) {
      // If we're updating an existing transaction
      return this.apiService.put('/api/transactions/' + transaction.slug, {transaction: transaction})
        .then(data => data.transaction)
    } else {
      // Otherwise, create a new transaction
      return this.apiService.post('/api/transactions/', transaction.transaction)
    }
  }
  
  saveExcelBalanceData(excelData) {
    return this.apiService.post('/api/transactions/excelData', excelData)
        .then(data => data.transaction)
  }
  
}
