import { 
  Component, 
  OnInit,
  ViewChild,
  ElementRef
} from '@angular/core';

import { LoggingService } from '../../services/logging.service';
import { UsersService } from '../../services/users.service';
import { gender } from '../../models/user.model';
import { IUser } from '../../models/user.model';

@Component({
  selector: 'fg-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  
  @ViewChild('usernameNGInput') private _usernameInput: ElementRef;
  @ViewChild('emailNGInput') private _emailInput: ElementRef;
  @ViewChild('passwordNGInput') private _passwordInput: ElementRef;
  

  private _username: string;
  private _email: string;
  private _password: string;
  private _sex: gender;
  private _newsletter: boolean = false;
  public errorStatus;

  public resetErrorStatus() {
    this.errorStatus = {
      username: {
        message: '',
        color: 'black'
      },
      email:  {
        message: 'We\'ll never share your email with anyone else.',
        color: 'black'
      },
      password: { 
        message: '',
        color: 'black'
      },
      sex: {
        message: '',
        color: 'black'
      }
    }
  }


  constructor(
    private _logger: LoggingService,
    private _usersService: UsersService) { }

  public onChangeSex(sex: gender): void {
    this._sex = sex;
  }

  public onChangeNewsletter(newsletter: boolean): void {
    this._newsletter = newsletter;
  }

  public onChange

  ngOnInit() {
    this.resetErrorStatus();
  }

  public addNewUser(): void {
    let valid: boolean = true;
    
    if (this._usernameInput.nativeElement.value) {
      if (this._usernameInput.nativeElement.value.search(' ') === -1) {
        this._username = this._usernameInput.nativeElement.value;
        this.errorStatus.username.message = '';
        this.errorStatus.username.color = 'black';
      } else {
        this.errorStatus.username.message = 'Username cannot contain spaces.';
        this.errorStatus.username.color = 'darkred';
        valid = false;
      }   
    } else {
      this.errorStatus.username.message = 'Blank username!';
      this.errorStatus.username.color = 'darkred';
      valid = false;
    }

    if (this._passwordInput.nativeElement.value) {
      this._password = this._passwordInput.nativeElement.value;
      this.errorStatus.password.message = '';
      this.errorStatus.password.color = 'black';
    } else  {
      this.errorStatus.password.message = 'Blank password!';
      this.errorStatus.password.color = 'darkred';
      valid = false;
    }

    if ((this._emailInput.nativeElement.value.indexOf('@') >= 1) && 
    (this._emailInput.nativeElement.value.indexOf('@') <= 
    this._emailInput.nativeElement.value.length - 2)){
      this._email = this._emailInput.nativeElement.value;
      this.errorStatus.email.message = '';
      this.errorStatus.email.color = 'black'
    } else  {
      this.errorStatus.email.message = 'Wrong email!';
      this.errorStatus.email.color = 'darkred';
      valid = false;
    }

    if (this._sex) {
      this.errorStatus.sex.message = '';
      this.errorStatus.sex.color = 'black';     
    } else  {
      this.errorStatus.sex.message = 'You must choose a sex!';
      this.errorStatus.sex.color = 'darkred';
      valid = false;
    }

    if (valid) {     
      this._logger.log(`New user ${this._username} was added...`);
      this.errorStatus.username = this._usersService.addUser({
        username: this._username,
        email: this._email,
        password: this._password,
        sex: this._sex,
        newsletter: this._newsletter
      });
    }
  }

}