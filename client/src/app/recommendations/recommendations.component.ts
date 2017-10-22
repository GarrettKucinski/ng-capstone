import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
    selector: 'app-recommendations',
    templateUrl: './recommendations.component.html',
    styleUrls: ['./recommendations.component.css']
})
export class RecommendationsComponent implements OnInit {
    user;
    tweets;
    constructor(private dataService: DataService) {}

    ngOnInit() {
        // Called after the constructor, initializing input properties, and the first call to ngOnChanges.
        // Add 'implements OnInit' to the class.

        this.dataService.getTweets().subscribe(
            tweets => this.tweets = tweets
        );
    }
}
