import { Component, OnInit } from '@angular/core';

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  title = 'Welcome!';
  loggedIn;

  constructor(private authService: AuthService) { }
  user: {} = {};
  ngOnInit() {
        this.authService.getAuthenticatedUser().subscribe(
            data => {
              this.user = data;
            }
        );

    this.authService.userDidAuthenticate.subscribe((authenticated: boolean) => {
      authenticated ? this.loggedIn = true : this.loggedIn = false;
    });
  }

  onLogOut() {
    this.authService.logOutUser();
  }

}
