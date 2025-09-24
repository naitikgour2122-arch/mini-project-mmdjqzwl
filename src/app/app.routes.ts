import { Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { ManageUsersComponent } from './components/manage-users/manage-users.component';

export const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'add',
    component: AddUserComponent
  },
  {
    path: 'manage',
    component: ManageUsersComponent
  }
];
