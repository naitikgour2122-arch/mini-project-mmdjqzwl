import { Injectable } from '@angular/core';


interface IBlockDeleteAllUserButton {
    value: () => boolean;
    noUsers: boolean;
    buttonAlreadyOpen: boolean; 
  }


@Injectable()
export class DisableUIElementsService {

  blockDeleteAllUsersButton: IBlockDeleteAllUserButton;
  blockAllDeleteUserButtons: boolean;
  blockAllEditUserButtons: boolean;
  blockDeteteUser: Array<boolean>;
  blockEditUser: Array<boolean> ;

}