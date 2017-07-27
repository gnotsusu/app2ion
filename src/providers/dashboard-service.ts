import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the DashboardService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class DashboardService {

  public host:string = "http://122.155.197.104/sysdamrongdham";

  constructor(public http: Http) {
    console.log('Hello DashboardService Provider');
  }


}
