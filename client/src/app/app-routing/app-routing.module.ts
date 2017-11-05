import { AuthGuardService } from '../services/auth-guard.service';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from '../home/home.component';
import { RecommendationsComponent } from '../recommendations/recommendations.component';
import { BusinessDetailComponent } from './../business/business-detail/business-detail.component';

const appRoutes: Routes = [
    { path: '', component: HomeComponent, pathMatch: 'full' },
    { path: 'recommendations', component: RecommendationsComponent, canActivate: [AuthGuardService] },
    {path: ':name', component: BusinessDetailComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
