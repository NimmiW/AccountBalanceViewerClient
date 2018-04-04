import {BindingEngine} from 'aurelia-framework';
import {inject} from 'aurelia-dependency-injection';
import {SharedState} from '../../shared/state/sharedstate';
import {ReportService} from "../../shared/services/reportservice";
import {Chart} from 'node_modules/chart.js/dist/Chart.js';
import moment from 'moment';
import lodash from 'lodash';

@inject(SharedState, BindingEngine,ReportService)
export class ReportComponent {
  reportdata = null;
  labels = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ]

  //accountNames = ['RandD', 'Canteen', 'CEOCar', 'Marketing', 'ParkingFines']

  lineOptions = {
    title:{
      display:true,
      text:`Monthly Account Balances of year ${this.year}`
    },
    tooltips: {
      mode: 'index',
      intersect: false,
    },
    hover: {
      mode: 'nearest',
      intersect: true
    },
    scales: {
      xAxes: [{
        gridLines: {
          display: true,
        },
        scaleLabel: {
          display: true,
          labelString: 'Month'
        }
      }],
      yAxes: [{
        gridLines: {
          display: true,
        },
        ticks: {
          beginAtZero: true
        },
        scaleLabel: {
          display: true,
          labelString: 'Amount'
        }
      }],
    },
  };
  
  constructor(sharedState, bindingEngine, reportService) {
    this.sharedState = sharedState;
    this.bindingEngine = bindingEngine;
    this.reportService = reportService;
    this.year = moment().year();
  }

  attached() {
    if(this.sharedState.currentUser.role=='ADMIN'){
      this.getReport();
    }
    
  }
  
  getReport() {
    this.reportdata = null

    let params = {
      year: this.year
    };


    this.reportService.getReport(params)
      .then(response => {
        this.reportdata = response;

        this.lineData = {
          labels: this.labels,
          datasets: [
            {
              label: 'R&D',
              data: response['RandD'],
              backgroundColor: 'rgba(255,0,0,1)',
              borderColor: 'rgba(255,0,0,1)',
              borderWidth: 1,
              fill: false,
            },
            {
              label: 'Canteen',
              data: response['Canteen'],
              backgroundColor: 'rgba(0, 255, 0, 0.2)',
              borderColor: 'rgba(0, 255, 0, 1)',
              borderWidth: 1,
              fill: false,
            },
            {
              label: 'CEO’s car',
              data: response['CEOCar'],
              backgroundColor: 'rgba(0, 0, 255, 0.2)',
              borderColor: 'rgba(0,0,255,1)',
              borderWidth: 1,
              fill: false,
            },
            {
              label: 'Marketing',
              data: response['Marketing'],
              backgroundColor: 'rgba(54, 500, 235, 0.2)',
              borderColor: 'rgba(54, 500, 235, 1)',
              borderWidth: 1,
              fill: false,
            },
            {
              label: 'Parking fines',
              data: response['ParkingFines'],
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderColor: 'rgba(255,99,132,1)',
              borderWidth: 1,
              fill: false,
            }
          ]
        };

        this.lineOptions.title.text=`Monthly Account Balances of year ${this.year}`;
        let ctx = this.chart;  

        var myChart = new Chart(ctx, {
          type: 'line',
          data: this.lineData,
          options: this.lineOptions,
        });
      })
  }

}
