import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
    selector: 'app-recommendations',
    templateUrl: './recommendations.component.html',
    styleUrls: ['./recommendations.component.css']
})
export class RecommendationsComponent implements OnInit {
    user;
    businesses;
    locationName: string;
    startingLat: string;
    startingLong: string;
    constructor(private dataService: DataService) {}

    ngOnInit() {
        // Called after the constructor, initializing input properties, and the first call to ngOnChanges.
        // Add 'implements OnInit' to the class.

        this.dataService.getReviewData().subscribe(
          // Use data service to get yelp data
            data => {
              this.businesses = data.businesses;
              this.locationName = data.businesses[0].location.city;
              this.startingLat = data.businesses[0].coordinates.latitude;
              this.startingLong = data.businesses[0].coordinates.longitude;
            }
        );
    }
}
