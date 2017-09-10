import { Step1 } from './../step-1/step-1';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Complaint } from '../complaint/complaint';
import { Result } from "../result/result";
import { Report } from "../report/report";
import { Dashboard } from "../dashboard/dashboard";
import { DashboardService } from "../../providers/dashboard-service";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [DashboardService]
})
export class HomePage {
  public dataStatus: object[] = [];
  constructor(public navCtrl: NavController, dashboardService: DashboardService) {
    dashboardService.getDashboardCountlist().then((data) => {
      console.log(data);
      Object.keys(data).forEach((key) => {
        this.dataStatus.push(data[key]['sum_complain']);
      });
      console.log(this.dataStatus);
    });


  }

  goToComplaint() {
    this.navCtrl.push(Step1);
  }

  goToAllComplaint() {
    this.navCtrl.push(Dashboard);
  }

  goToResult() {
    this.navCtrl.push(Result);
  }

  goToReport() {
    this.navCtrl.push(Report);
  }

}
