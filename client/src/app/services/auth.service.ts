import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class AuthService {
   constructor(private http: Http) {}
   logInUser() {
        return this.http.get(`/api/twitter`)
            .map((response: Response) => response.json())
            .catch((error: Response) => Observable.throw(error.json()));
   }
}
