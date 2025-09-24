import { 
  Component, 
  OnInit,
  Output,
  EventEmitter
} from '@angular/core';

@Component({
  selector: 'fg-delete-all-users',
  templateUrl: './delete-all-users.component.html',
  styleUrls: ['./delete-all-users.component.scss']
})
export class DeleteAllUsersComponent implements OnInit {

  @Output() public onDeleteAllUsers: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

  public onConfirmDeletion(): void {
    this.onDeleteAllUsers.emit(true);
  }

  public onDenyDeletion(): void {
    this.onDeleteAllUsers.emit(false);    
  }

}