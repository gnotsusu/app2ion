import { RequestOptions, Http,Headers } from '@angular/http';
import { Step2 } from './../step-2/step-2';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


/**
 * Generated class for the Step1 page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-step-1',
  templateUrl: 'step-1.html',
})
export class Step1 {
  step2Page = Step2;
  public complain_date:any = '' ;
  public recipient:string = '';
  public doc_receive_date: any = '';
  public doc_receive_no:string = '' ;
  public doc_send_date: any = '';
  public doc_send_no:string = '' ;
  public user_complain_type_id:string = '';
  public host = 'http://122.155.197.104/sysdamrongdham';
  public auth = this.host+'/api/complaint/key_in';
  public token: string;
 

  constructor(public navCtrl: NavController, public navParams: NavParams,public RequestOptions:RequestOptions,public http:Http) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Step1');
  }

  saveData(){
    let Complaint_data = {
      complain_date:this.complain_date ,
      recipient:this.recipient,
      doc_receive_date: this.doc_receive_date,
      doc_receive_no:this.doc_receive_no,
      doc_send_date: this.doc_send_date,
      doc_send_no:this.doc_send_no, 
      user_complain_type_id: this.user_complain_type_id
    }
    
    return new Promise((resolve, reject) => {

      let headers = new Headers();
      headers.append('Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyaWQiOiIxIiwiZnVsbG5hbWUiOiJcdTBlMTlcdTBlMzJcdTBlMjJBZG1pbiBpc3RyYXRvciIsInVzZXJuYW1lIjoiYWRtaW5pc3RyYXRvciIsInBlcm1pc3Npb24iOlsiMjEiLCIyIiwiNSIsIjciLCIxMCIsIjExIiwiMTMiLCIxNCIsIjE1IiwiMTYiLCIxNyIsIjE4IiwiMjAiLCIxOSIsIjIyIiwiMjMiXSwiaWF0IjoxNTAxMTU1MTA4LCJleHAiOjE1MDEyNDE2MDh9.Lmh2FFzJK8vgHsogI5Uw-geccgfqJ0-ewG4s3vBGoRo');
      headers.append('Content-Type', 'application/x-www-form-urlencoded');

      let body = "complain_date=" + Complaint_data.complain_date + "&recipient=" + Complaint_data.recipient + "&doc_receive_date=" + Complaint_data.doc_receive_date + "&doc_receive_no=" + Complaint_data.doc_receive_no + "&doc_send_date=" + Complaint_data.doc_send_date + "&doc_send_no=" + Complaint_data.doc_send_no + "&user_complain_type_id=" + Complaint_data.user_complain_type_id + "&step=1";
      let options = new RequestOptions({headers: headers});

      this.http.post(this.auth, body, options).map(res => res).subscribe(
        data => {
          console.log(data['_body']);
          this.navCtrl.push(Step2, {param1: data['_body']});
        },
        err => {
          console.log('Http Error');
          reject(err);
        }
      );

    });
    
   }

}
