import {config} from './config';
import {HttpClient, json} from 'aurelia-fetch-client';
import {inject} from 'aurelia-dependency-injection';
import * as qs from 'querystringify';
import {JwtService} from './jwtservice';
import {status, parseError} from './servicehelper';

@inject(HttpClient, JwtService)
export class ApiService {
  
  constructor(http, jwtService) {
    this.http = http;
    this.jwtService = jwtService;
  }
  
  setHeaders() {
    const headersConfig = {
      'Content-Type': 'application/json',
      //'Content-Type':'application/x-www-form-urlencoded',
      'Accept': 'application/json',
      //'Access-Control-Allow-Headers': '*',
      //'Access-Control-Allow-Origin': '*'
    };
    if (this.jwtService.getToken()) {
      headersConfig['Authorization'] = `Bearer ${this.jwtService.getToken()}`;
    }
    return new Headers(headersConfig);
  }

  get(path, params) {
    const options = {
      method: 'GET',
      headers: this.setHeaders()
    };
    return this.http.fetch(`${config.api_url}${path}?${qs.stringify(params)}`,options)
      .then(status)
      .catch(parseError)
  }
 
  put(path, body = {}) {
    const options = {
      method: 'PUT',
      headers: this.setHeaders(),
      body: json(body)
    };
    return this.http.fetch(`${config.api_url}${path}`,options)
      .then(status)
      .catch(parseError)
  }
  
  post(path, body = {}) {
    const options = {
      method: 'POST',
      headers: this.setHeaders(),
      //mode: "no-cors",
      body: json(body)
    };
    return this.http.fetch(`${config.api_url}${path}`,options)
      .then(status)
      .catch(parseError)
  }

  postForLogin(path, body = {}) {
    return this.http.fetch(config.api_url+'/token', {
      method: 'POST',
      contentType: 'application/x-www-form-urlencoded',
      //crossDomain: true,
      //mode: 'cors',
      body: 'grant_type=password&userName='+body.username+'&password='+body.password
    })
      .then(data => {
        data = data.json()
        return data
      })
      .catch(error => {
        return "no token error"

      });

  }
  
  delete(path) {
    const options = {
      method: 'DELETE',
      headers: this.setHeaders()
    };
    return this.http.fetch(`${config.api_url}${path}`,options)
      .then(status)
      .catch(parseError)
  }
}
