import {Component, OnInit, ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Auth} from "../../providers/auth";
import {Reports} from "../../providers/reports";

/**
 * Generated class for the DonusCharts page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-line-charts',
  templateUrl: 'line-charts.html',
})
export class LineCharts implements OnInit{

  ngOnInit(): void {
    throw new Error("Method not implemented.");
  }


  public chartOptions:any = {
    responsive: true
  };

  public doughnutChartLabels:Array<any>;

  public doughnutChartData: Array<any>;

  public doughnutChartType:string = 'horizontalBar';

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public reports: Reports,
              public auth : Auth) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DonusCharts');
    this.auth.isCheck().then( (token:string) => {
      //console.log(token);
      return token;
    }).then(token => {
      return this.reports.getReport(token);
    }).then((data:any) => {
      //console.log(data.lables, data.datasets);
      this.doughnutChartLabels = JSON.parse(data.lables);
      this.doughnutChartData = JSON.parse(data.datasets);
      console.log(this.doughnutChartLabels, this.doughnutChartData);
    }).catch( err => {
      console.debug(err);
    })
  }

  chartHovered(e:any):void{
    console.log(e);
  }

  chartClicked(e:any):void{
    console.log(e);
  }


}
