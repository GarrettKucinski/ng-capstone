import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    loggedIn;
    constructor(private authService: AuthService, private router: Router) {}
    ngOnInit() {
        // Called after the constructor, initializing input properties, and the first call to ngOnChanges.
        // Add 'implements OnInit' to the class.

        this.authService.userDidAuthenticate.subscribe((authenticated: boolean) => {
            if(authenticated) {
              this.loggedIn = true;
              this.router.navigate(['/recommendations'])
            }  else {
              this.loggedIn = false;
            }
        });
    }
}
