import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { AuthService } from '../services/auth.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    title = 'Twitter Yelp Recommendation App';
    data: {};

    constructor(private authService: AuthService, private dataService: DataService) {}
    ngOnInit() {
        // Called after the constructor, initializing input properties, and the first call to ngOnChanges.
        // Add 'implements OnInit' to the class.
        this.dataService.getUser().subscribe(
            data => this.data = data.token
        )
    }
}
