import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {ResultState} from "../pages/result-state/result-state";

export class ResultDataSet{

  id: number;
  name:string;
  component:any;

  constructor(id: number, name: string, component: any) {
    this.id = id;
    this.name = name;
    this.component = component;
  }
}

/*
  Generated class for the ResultService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class ResultService {

  resultList: ResultDataSet[];

  constructor(public http: Http) {
    console.log('Hello ResultService Provider');
  }

  getReportList(){

    return new Promise((resolve)=>{
      this.resultList = [
        new ResultDataSet(1, 'TextViewTitle', ResultState),
        new ResultDataSet(2, 'TextViewTitle', ResultState),
        new ResultDataSet(3, 'TextViewTitle', ResultState),
        new ResultDataSet(4, 'TextViewTitle', ResultState)
      ];
      resolve(this.resultList);
    });

  }

}
