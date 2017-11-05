import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/Rx';

@Injectable()
export class DataService {
    constructor(private http: Http) {}

    getReviewData() {
      return this.http.get('/api/reviews')
        .map((response: Response) => response.json())
        .catch((error: Response) => Observable.throw(error.json()));
    }

    getBusinessDetails(businessName) {
      return this.http.get(`/api/${ businessName }`)
        .map((response: Response) => response.json())
        .catch((error: Response) => Observable.throw(error.json()));
    }

    getBusinessReviews(businessName) {
      return this.http.get(`/api/${ businessName }/reviews`)
        .map((response: Response) => response.json())
        .catch((error: Response) => Observable.throw(error.json()));
    }
}
