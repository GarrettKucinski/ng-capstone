import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { HttpModule } from '@angular/http';
import { AgmCoreModule } from '@agm/core';
import { AngularFontAwesomeModule } from 'angular-font-awesome/angular-font-awesome';

import { DataService } from './services/data.service';
import { AuthService } from './services/auth.service';
import { AuthGuardService } from './services/auth-guard.service';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { RecommendationsComponent } from './recommendations/recommendations.component';
import { BusinessComponent } from './business/business.component';
import { BusinessDetailComponent } from './business/business-detail/business-detail.component';
import { BusinessReviewComponent } from './business/business-review/business-review.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    RecommendationsComponent,
    BusinessComponent,
    BusinessDetailComponent,
    BusinessReviewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    AngularFontAwesomeModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDW1vNEEmNaFZ_jUXqybkfOltKyZjxHYX4'
    })
  ],
  providers: [AuthService, DataService, AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
