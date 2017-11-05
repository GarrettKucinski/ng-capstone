import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-business-review',
  templateUrl: './business-review.component.html',
  styleUrls: ['./business-review.component.css']
})
export class BusinessReviewComponent implements OnInit {

  @Input() review;

  constructor() { }

  ngOnInit() {
  }

}
