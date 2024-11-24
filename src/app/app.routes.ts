import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DetailsComponent } from './components/details/details.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';

export const routes: Routes = [
      {
        path: '',
        component: HomeComponent,
        title: 'Home page',
      },
      {
        path: 'details/:id',
        component: DetailsComponent,
        title: 'Profile  Details',
      },
      { path: 'admin', 
        component: AdminPanelComponent,
        title: 'Admin Panel', },
];
