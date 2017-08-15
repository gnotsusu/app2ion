import { Step1 } from './../step-1/step-1';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Complaint } from '../complaint/complaint';
import {Result} from "../result/result";
import {Report} from "../report/report";
import {Dashboard} from "../dashboard/dashboard";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  goToComplaint(){
    this.navCtrl.push(Step1);
  }

  goToAllComplaint(){
    this.navCtrl.push(Dashboard);
  }

  goToResult(){
    this.navCtrl.push(Result);
  }

  goToReport(){
    this.navCtrl.push(Report);
  }

}
