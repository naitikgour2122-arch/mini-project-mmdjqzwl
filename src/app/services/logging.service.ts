import { Injectable } from '@angular/core';
import moment from 'moment';

@Injectable()
export class LoggingService {

  private _message: string;

  public get message(): string {
    return this._message;
  }

  public set message(msg: string) {    
    if (msg) {
      this._message = msg;
    } else {
      this._message = 'No message...'
    }      
  }

  constructor() { }

  public log(msg?: string): void {
    if (msg) {
      console.log(`Log on ${
        moment().format('MMMM Do YYYY, h:mm:ss a')
        }: '${msg}'.`);
    } else {
      console.log(`Log on ${
        moment().format('MMMM Do YYYY, h:mm:ss a')
        }: '${this.message}'.`);
    }   
  }

}