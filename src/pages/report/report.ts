import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  public doughnutChartLabels:string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  public doughnutChartData:number[] = [350, 450, 100];
  public doughnutChartType:string = 'doughnut';

  ionViewDidLoad() {
    console.log('ionViewDidLoad Report');
  }

  chartHovered(e:any):void{
    console.log(e);
  }

  chartClicked(e:any):void{
    console.log(e);
  }

}
