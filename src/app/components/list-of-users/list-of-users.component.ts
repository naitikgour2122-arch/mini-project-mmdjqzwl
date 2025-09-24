import { 
  Component, 
  OnInit, 
  OnDestroy,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

import { LoggingService } from '../../services/logging.service';
import { UsersService } from '../../services/users.service';
import { IUser } from '../../models/user.model';

@Component({
  selector: 'fg-list-of-users',
  templateUrl: './list-of-users.component.html',
  styleUrls: ['./list-of-users.component.scss']
})
export class ListOfUsersComponent implements OnInit, OnDestroy {

  public users: Array<IUser> = [];

  @Input() public blockAllDeleteUserButtons: boolean;
  @Input() public blockAllEditUserButtons: boolean;

  @Output() public deleteUserClickedEvent: EventEmitter<number> = new EventEmitter<number>();
  @Output() public noUserEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    private _logger: LoggingService,
    private _usersService: UsersService) { 
    }

  private _cleanAuxArray() {
    this.users = [];
  }

  private _initAuxArray(): void {
    this._cleanAuxArray();
    for (let i: number = 0; i <= this._usersService.numberOfUsers() - 1; i++) {
      this.users.push(this._usersService.returnUser(i));
    }    
    if (this.users.length) {
      this.noUserEvent.emit(false);
    } else {
      this.noUserEvent.emit(true);
    }
  }

  ngOnInit() {  
    this._initAuxArray();
    this._usersService.dataModified.subscribe(() => {      
      this._initAuxArray();
    });
  }

  ngOnDestroy() {
    this._cleanAuxArray();
  }

  public onDeleteUserClicked(index: number): void {
    this.deleteUserClickedEvent.emit(index);
  }

}