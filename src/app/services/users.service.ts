import { Injectable, EventEmitter } from '@angular/core';

import { IUser } from '../models/user.model';
import { LoggingService } from './logging.service';

@Injectable()
export class UsersService {
  private _users: Array<IUser> = [];
  public dataModified = new EventEmitter<boolean>(); 
 

  constructor(private _logger: LoggingService) { }

  public addUser(user: IUser): { message: string, color: string } {
    if (this._users.findIndex((usr: IUser): boolean => 
      usr.username === user.username) === -1) {
      this._users.push(user);
      this.dataModified.emit(true);
      return {
        message: '',
        color: 'black'
      }
    } else {
      this._logger.log(`There is already a user with username ${user.username}.`);
      return {
        message: `There is already a user with username ${user.username}.`,
        color: 'darkred'
      }
    }
  }

  public numberOfUsers(): number {
    return this._users.length;
  }

  public returnUser(index: number): IUser {
    return this._users[index];
  }

  public wipeData() {
    this._users = [];
    this.dataModified.emit(true);
  }
}