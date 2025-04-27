import { Routes } from '@angular/router';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';

export const routes: Routes = [
    {
        path:'dashboard',
        component:UserDashboardComponent
    },
    {
        path:'', redirectTo:'dashboard', pathMatch:'full'
    }
];
