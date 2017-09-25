import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/Rx';

@Injectable()
export class DataService {
    constructor(private http: Http) {}

    getTweets() {
        return this.http.get('/api/tweets')
            .map((response: Response) => response.json())
            .catch((error: Response) => Observable.throw(error.json()))
    }
}
