import {inject} from 'aurelia-dependency-injection';
import {json} from 'aurelia-fetch-client';
import {TransactionService} from "../../shared/services/transactionservice";
import {SharedState} from '../../shared/state/sharedstate';
import {AccountService} from "../../shared/services/accountservice";
import moment from 'moment';

@inject(TransactionService, AccountService, SharedState)
export class UpdateBalance {
  transactions = [];
  months = [
    { id:0, name:"January"},
    { id:1, name:"February"},
    { id:2, name:"March"},
    { id:3, name:"April"},
    { id:4, name:"May"},
    { id:5, name:"June"},
    { id:6, name:"July"},
    { id:7, name:"August"},
    { id:8, name:"September"},
    { id:9, name:"October"},
    { id:10, name:"November"},
    { id:11, name:"December"}
  ]
  excelData = [];

  constructor(transactionService, accountService, sharedState){
    this.transactionService = transactionService;
    this.accountService = accountService;
    this.sharedState = sharedState;
    this.success = false;
    this.fail = false;
    this.year = moment().year();
    this.month = moment().month();
  }

  attached(){

    if(this.sharedState.currentUser.role=='ADMIN'){
      this.getAllAccounts();
      this.getAll(this.year, this.month);
    }

  }

  getAllAccounts(){
    this.accountService.getAllAccounts()
        .then(response => {
          this.accountList = response;
        })
  }

  getAll(year, month) {


      this.year = year;
      this.month = month;
      let params = {
        year: year,
        month: month
      };

      this.transactions = []
  
  
      this.transactionService.getAll(params)
        .then(response => {
          this.transactions = response;

          this.transactions.forEach(element => {
            element.month = moment(month+1, 'MM').format('MMMM');
          });
          this.monthString =  moment(month+1, 'MM').format('MMMM');
        })

    
  }

  addTransaction(){
    if(parseInt(this.newAmount)>0){
    //if(1){
      let transaction = {
        Month: this.month,
        Year: this.year,
        Amount: parseInt(this.newAmount),
        AccountId: this.selectedAccountId
      }

      let params = {
        transaction: transaction
      }



      this.transactionService.save(params).then(response => {
        this.getAll(this.year, this.month)
      },err => {
        console.log(err)
      });
    }


  }

  deleteTransaction(transactionId){
    this.transactionService.destroy(transactionId)
    .then(response => {
      this.getAll(this.year, this.month)

    })
  }

  upload(files) {
    let disp = document.getElementById('fileDisplayArea');
    console.log(disp.innerText)
    this.convertTextToArray(disp.innerText);
    console.log(this.excelData);
    let month = this.excelData[0][1]-1;
    let year = this.excelData[1][1]-1;
    let RandD = this.excelData[3][1];
    let Canteen = this.excelData[4][1];
    let CEOCar = this.excelData[5][1];
    let Marketing = this.excelData[6][1];
    let ParkingFines = this.excelData[7][1];

    let postDate = {
      month,
      year,
      RandD,
      Canteen,
      CEOCar,
      Marketing,
      ParkingFines
    }

    this.transactionService.saveExcelBalanceData(postDate)
    .then(data => {
      this.getAll(year, month)
    })
    

  }

  getAsText(files) {
    let disp = document.getElementById('fileDisplayArea');
    disp.innerText = '';
    if (window.FileReader) {
      let reader = new FileReader();
      reader.onload = function(e) {
        disp.innerText = reader.result;
      }
      reader.readAsText(files[0]);
    } else {
        alert('FileReader are not supported in this browser.');
    }
  }

  convertTextToArray(text) {
    let allTextLines = text.split(/\r\n|\n/);
    let lines = [];
    for (let i=0; i<allTextLines.length; i++) {
        let data = allTextLines[i].split(',');
            let tarr = [];
            for (let j=0; j<data.length; j++) {
                tarr.push(data[j]);
            }
            lines.push(tarr);
    }
    this.excelData = lines;
  }

}
