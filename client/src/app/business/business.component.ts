import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-business',
  templateUrl: './business.component.html',
  styleUrls: ['./business.component.css']
})
export class BusinessComponent implements OnInit {

  @Input() business;

  constructor() { }

  ngOnInit() {
  }

}
