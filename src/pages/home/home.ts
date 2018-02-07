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
      // console.log(data);
      let success = 0;
      Object.keys(data).forEach((key) => {
        // this.dataStatus.push([data[key]['sum_complain'],data[key]['sum_complain']]);

        if (data[key]['current_status_id'] == 'all') {
          this.dataStatus['9'] = data[key]['sum_complain'];
        } else if (data[key]['current_status_id'] == '4' || data[key]['current_status_id'] == '5' || data[key]['current_status_id'] == '6') {
          // this.dataStatus['4'] += (parseInt(data[key]['sum_complain']));
          success = success + parseInt(data[key]['sum_complain']);
          this.dataStatus['4'] = success;
          // console.log('sum_complain',success);
        } else {
          this.dataStatus[data[key]['current_status_id']] = data[key]['sum_complain'];
        }
      });
      console.log(this.dataStatus);
    });


  }

  goToComplaint() {
    this.navCtrl.push(Step1);
  }

  goToAllComplaint(status) {
    if (status !== null) {
      this.navCtrl.push(Dashboard, { status_id: status });
    } else {
      this.navCtrl.push(Dashboard);
    }

  }

  goToResult() {
    this.navCtrl.push(Result);
  }

  goToReport() {
    this.navCtrl.push(Report);
  }

}
