import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Complaint } from '../complaint/complaint';
import {Result} from "../result/result";
import {Report} from "../report/report";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  goToComplaint(){
    this.navCtrl.push(Complaint);
  }

  goToResult(){
    this.navCtrl.push(Result);
  }

  goToReport(){
    this.navCtrl.push(Report);
  }

}
