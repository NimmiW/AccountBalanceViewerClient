import {inject} from 'aurelia-dependency-injection';
import {Router, activationStrategy} from 'aurelia-router';
import {ValidationControllerFactory, ValidationRules} from 'aurelia-validation';
import {UserService} from '../../shared/services/userservice';
import {SharedState} from '../../shared/state/sharedstate';
import {TransactionService} from '../../shared/services/transactionservice';

@inject(TransactionService, UserService, SharedState, Router, ValidationControllerFactory)
export class AuthComponent {
  type = '';
  username = '';
  email = '';
  password = '';
  errors = null;
  errorMsg = null;
  roles = [];
  
  constructor(transactionService, userService, sharedState, router, controllerFactory) {
    //this.type = 'login'
    this.transactionService = transactionService;
    this.userService = userService;
    this.sharedState = sharedState;
    this.router = router;
    this.controller = controllerFactory.createForCurrentScope();
    
    ValidationRules
      .ensure('email').required().email()
      .ensure('password').required().minLength(6)
      .ensure('confirmPassword').required().when((auth) => auth.type === 'register')
      .on(this);
  }
  
  determineActivationStrategy() {
    return activationStrategy.replace;
  }
  
  activate(params, routeConfig) {
    this.type = routeConfig.name;
    this.roles = [
      {
        name: "ADMIN",
        id: 1
      },
      {
        name: "USER",
        id: 2
      }
    ]
  }
  
  get canSave() {
    if (this.type == 'login') {
      return this.email !== '' && this.password !== '';
    } else {
      return this.email !== '' && this.password !== '' && this.confirmPassword === this.password;
    }
  }
  
  submit() {
    this.errors = null;
    this.errorMsg = null;
    this.successMsg = null;
    if (this.type == 'login') {
      const credentials = {
        username: this.email,
        password: this.password,
        grant_type:"password"
      };
      this.userService.attemptAuth(credentials)
      .then(response => {
        if(response=='User logged in successfully.') {
          this.failLogin = null;
        } else {
          this.failLogin = 'Sorry, an error occured in during login.';
        }
      },err => {
        this.failLogin = 'Sorry, an error occured in during login.';
      });
    } else {
      const credentials = {
        Email: this.email,
        Password: this.password,
        ConfirmPassword: this.confirmPassword,
      };

      const role = {
        Email: this.email,
        Role : this.selectedRoleId
      }

      this.userService.register(credentials)
      .then(response => {
        console.log(response)
        if(response == "User registration was successful."){
          return this.userService.addRole(role)
          .then(response => {
            if(response == "User role was added successful."){
              this.successRegister = "The user was registered successfully";
              this.failRegister = null;
            } else {
              this.successRegister = null;
              this.failRegister = "An Error occued while registering the role to the user";
            }
          },err => {
            this.successRegister = null;
            this.failRegister = "An Error occued while registering the user";
          });

        } else {
          this.successRegister = null;
          this.failRegister = "An Error occued while registering the user";
        }
      },err => {
        this.successRegister = null;
        this.failRegister = "An Error occued while registering the user";
      });

    }
    
  }
}
