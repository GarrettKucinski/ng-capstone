import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/Rx';

@Injectable()
export class AuthService {
  token: string;
  constructor(private http: Http, private router: Router) {}

  userDidAuthenticate = new Subject<boolean>();

  getAuthenticatedUser() {
      return this.http.get('/api')
          .map((response: Response) => {
            this.token = response.json().token;
            this.userDidAuthenticate.next(this.token ? true : false);

            return response.json().user;
          })
          .catch((error: Response) => Observable.throw(error.json()));
  }

  logOutUser() {
    this.token = null;
    this.userDidAuthenticate.next(this.token ? true : false);
  }
  isAuthenticated() {
    return this.token != null;
  }
}
