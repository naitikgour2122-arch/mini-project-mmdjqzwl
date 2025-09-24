import { 
  Component, 
  OnInit, 
  AfterViewInit,
  ChangeDetectionStrategy,
} from '@angular/core';

import { LoggingService } from '../../services/logging.service';
import { UsersService } from '../../services/users.service';
import { bulkUsers } from '../../data/users-bulk.data';
import { DisableUIElementsService } from '../../services/disable-ui-elements.service';

interface ITabs {
  title: string;
  content: string;
  removable?: boolean;
  disabled?: boolean;
  active?: boolean;
}

@Component({
  selector: 'app-manage-users',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss']
})
export class ManageUsersComponent implements OnInit {
  public activateBulkUsers: boolean = true;

  public tabs: Array<ITabs> = [
    {
      title:'List Of Users',
      content: 'list-of-users',
      removable: false,
      active: true
    }
  ];

  constructor(
    private _logger: LoggingService,
    private _usersService: UsersService,
    public blockControls: DisableUIElementsService) { }
 
  public removeTabHandler(tab: any): void {
    this.blockControls.blockDeleteAllUsersButton.buttonAlreadyOpen = false;
    this.blockControls.blockAllDeleteUserButtons = false;
    this.blockControls.blockAllEditUserButtons = false;
    this.tabs.splice(this.tabs.indexOf(tab), 1);
  }  

  cucuBau(ev:any): void {
    console.log(ev);
  }

  ngOnInit() {   
    this.blockControls.blockDeleteAllUsersButton = {
      buttonAlreadyOpen: false,
      noUsers: true,
      value: () => this.blockControls.blockDeleteAllUsersButton.buttonAlreadyOpen || 
        this.blockControls.blockDeleteAllUsersButton.noUsers
    }
    this.blockControls.blockAllDeleteUserButtons = false;
    this.blockControls.blockAllEditUserButtons = false;
  }

  public addBulkData() {    
    this.activateBulkUsers = false;    
    for (let i: number = 0; i <= bulkUsers.length - 1; i++) {
      this._usersService.addUser(bulkUsers[i]);
    }
  }

  public openAllDataDeletionDialog() {
    this.blockControls.blockDeleteAllUsersButton.buttonAlreadyOpen = true;
    this.blockControls.blockAllDeleteUserButtons = true;
    this.blockControls.blockAllEditUserButtons = true;
    this.tabs.push({
      title: 'Delete All Users',
      content: 'delete-all-users',
      active: true,
      disabled: false,
      removable: true
    });  
  }

  public wipeData(verify: boolean) {    
    if (verify) {
      this._usersService.wipeData();
    }      
  }

  public activateMainTab(): void { 
    this.tabs[0].active = true; 
  }

}