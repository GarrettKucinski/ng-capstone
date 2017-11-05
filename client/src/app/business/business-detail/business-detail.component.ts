import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { DataService } from './../../services/data.service';

@Component({
  selector: 'app-business-detail',
  templateUrl: './business-detail.component.html',
  styleUrls: ['./business-detail.component.css']
})
export class BusinessDetailComponent implements OnInit {
  businessDetails = {};
  businessLocation = {};
  businessImage;
  businessReviews;
  latitude;
  longitude;
  infoWindowOpen = false;

  constructor(private route: ActivatedRoute, private dataService: DataService) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.dataService.getBusinessDetails(params['name']).subscribe(businessDetails => {
         this.businessDetails = businessDetails;
         this.infoWindowOpen = true;
         this.businessLocation = businessDetails.location;
         this.businessImage = `url(${ businessDetails.image_url })`;
         this.latitude = businessDetails.coordinates.latitude;
         this.longitude = businessDetails.coordinates.longitude;
      });

      this.dataService.getBusinessReviews(params['name']).subscribe(businessReviews => {
        this.businessReviews = businessReviews.reviews;
      });
    });
  }
}
