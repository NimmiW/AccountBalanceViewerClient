import { inject } from 'aurelia-dependency-injection';
import { ApiService } from './apiservice';
import { JwtService } from './jwtservice';
import { User } from '../models/user';
import { SharedState } from '../state/sharedstate';
import {Router, activationStrategy} from 'aurelia-router';

@inject(ApiService, JwtService, SharedState,Router)
export class UserService {

  constructor(apiService, jwtService, sharedState, router) {
    this.apiService = apiService;
    this.jwtService = jwtService;
    this.sharedState = sharedState;
  }

  // Verify JWT in localstorage with server & load user's info.
  // This runs once on application startup.
  populate() {
    if (this.jwtService.getToken()) {
      this.apiService.get('/token')
        .then(data => this.setAuth(data))
    } else {
      // Remove any potential remnants of previous auth states
      this.purgeAuth();
    }
  }

  setAuth(user) {
    // Save JWT sent from server in localstorage
    this.jwtService.saveToken(user.access_token);
    this.sharedState.currentUser = user;
    this.sharedState.isAuthenticated = true;
  }

  purgeAuth() {
    // Remove JWT from localstorage
    this.jwtService.destroyToken();
    this.sharedState.currentUser = new User();
    this.sharedState.isAuthenticated = false;
  }

  attemptAuth(credentials) {
    this.purgeAuth();

    return this.apiService.postForLogin('/token', credentials)
      .then(user => {
        if (user.access_token) {
          this.setAuth(user);
          this.getUserInfo()
            .then(info => {
              if (info.Role) {
                user.role = info.Role
                this.setAuth(user);
                location.assign('/#/home');
                return "User logged in successfully.";
              } else {
                this.purgeAuth();
                return "User login failed.";
              }
            }).catch(promise => {
              this.purgeAuth();
              return "User login failed.";
            });
        } else {
          this.purgeAuth();
          return "User login failed.";
        }

      }).catch(promise => {
        this.purgeAuth();
        return "User login failed.";
      });
  }

  getUserInfo() {
    return this.apiService.get('/api/Account/UserInfo')
      .then(info => {
        return info;
      }).catch(promise => {
        return "User reterival failed.";
      });
  }

  register(credentials) {
    return this.apiService.post('/api/Account/Register', credentials)
      .then(data => {
        return "User registration was successful.";
      }).catch(promise => {
        return "User registration failed.";
      });

  }

  addRole(role) {
    return this.apiService.post('/api/Account/AssignRole', role)
      .then(data => {
        return "User role was added successful.";
      }).catch(promise => {
        return "User role addtion failed.";
      });
  }


}
