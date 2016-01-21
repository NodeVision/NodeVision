import {bootstrap, View, Component, FormBuilder,provide, CORE_DIRECTIVES} from 'angular2/angular2';
import {RouteConfig, Router, APP_BASE_HREF, ROUTER_PROVIDERS, ROUTER_DIRECTIVES, CanActivate} from 'angular2/router';
import {HTTP_PROVIDERS, Http} from 'angular2/http';
import {AuthHttp, tokenNotExpired, JwtHelper} from '../../node_modules/angular2-jwt';

declare var Auth0Lock;

@View({
  directives: [CORE_DIRECTIVES]
})

export class AuthApp {
   

  lock = new Auth0Lock('9B7uUwnzc73tnd1YVu3oE7cesLWqciSA', 'nodevision.eu.auth0.com');

  constructor() {
      if(localStorage.getItem('profile') == null )
        this.login();
  }

  login() {
    this.lock.show(function(err:string, profile:string, id_token:string) {

      if(err) {
        throw new Error(err);
      }
      console.log(profile)
      localStorage.setItem('profile', JSON.stringify(profile));
      localStorage.setItem('id_token', id_token);
      
    });
  }

  logout() {
      
    localStorage.removeItem('profile');
    localStorage.removeItem('id_token');
    this.login();
  }
  
  isConnected() : boolean {
      console.log(localStorage.getItem('profile') != null);
      
      return localStorage.getItem('profile') != null;
  }

  loggedIn() {
    //return tokenNotExpired();
  }

}
//bootstrap(AuthApp);