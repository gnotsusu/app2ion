import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ReportDataSet, ReportService} from "../../providers/report-service";
/**
 * Generated class for the Report page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-report',
  templateUrl: 'report.html',
})
export class Report {

  list:ReportDataSet[];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public reportSer: ReportService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Report');

    this.reportSer.getReportList().then((data: ReportDataSet[]) =>{
      this.list = data;
    }).catch((err: ErrorEventHandler)=>{
      console.log(err);
    })

  }

  OpenReports(report:ReportDataSet): void{
    this.navCtrl.push(report.component);
  }

}
