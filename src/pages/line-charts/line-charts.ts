import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Auth} from "../../providers/auth";

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
export class LineCharts {

  public chartOptions:any = {
    responsive: true
  };

  public doughnutChartLabels:string[] = [
    "มกราคม",
    "กุมภาพันธ์",
    "มีนาคม",
    "เมษายน",
    "พฤษภาคม",
    "มิถุนายน",
    "กรกฎาคม",
    "สิงหาคม",
    "กันยายน"
  ];

  public doughnutChartData:any =[
    {
      "data": [
        10,
        9,
        11,
        8,
        0,
        0,
        45,
        26,
        2
      ],
      "label": "ทั่วไป"
    },
    {
      "data": [
        4,
        9,
        10,
        8,
        0,
        0,
        19,
        10,
        0
      ],
      "label": "สำคัญ"
    },
    {
      "data": [
        4,
        10,
        10,
        8,
        0,
        0,
        32,
        0,
        0
      ],
      "label": "บัตรสนเท่ห์"
    }
  ];

  public doughnutChartType:string = 'horizontalBar';

  constructor(public navCtrl: NavController, public navParams: NavParams, public auth : Auth) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DonusCharts');
    this.authorize();
  }

  chartHovered(e:any):void{
    console.log(e);
  }

  chartClicked(e:any):void{
    console.log(e);
  }

  authorize(){
    this.auth.isCheck().then( (token:string) => {
       return token;
    }).catch( err => {
       console.debug(err);
    })
  }

}
