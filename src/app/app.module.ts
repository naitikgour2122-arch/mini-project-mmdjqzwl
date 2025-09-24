import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AccordionModule } from 'ngx-bootstrap';
import { TabsModule } from 'ngx-bootstrap';

import { RootComponent } from './components/root/root.component';
import { LoggingService } from './services/logging.service';
import { ListOfUsersComponent } from './components/list-of-users/list-of-users.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { UsersService } from './services/users.service';
import { HomeComponent } from './components/home/home.component';
import { appRoutes } from './app.routes';
import { ManageUsersComponent } from './components/manage-users/manage-users.component';
import { DeleteAllUsersComponent } from './components/delete-all-users/delete-all-users.component';
import { DisableUIElementsService } from './services/disable-ui-elements.service';


@NgModule({
  imports: [ 
    BrowserModule, 
    FormsModule,
    RouterModule.forRoot(appRoutes),
    AccordionModule.forRoot(),
    TabsModule.forRoot()
  ],
  declarations: [ 
    RootComponent, 
    ListOfUsersComponent, 
    AddUserComponent, 
    HomeComponent,
    ManageUsersComponent,
    DeleteAllUsersComponent
  ],
  bootstrap: [ RootComponent ],
  providers: [LoggingService, UsersService, DisableUIElementsService]
})
export class AppModule { }
