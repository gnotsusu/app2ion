import { Complaint } from './../complaint/complaint';
import { Step3 } from './../step-3/step-3';
import { RequestOptions, Http, Headers} from '@angular/http';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


export class ComplaintType{

  id:number;
  name:string;

  public constructor(id:number, name:string){
    this.id = id;
    this.name = name;
  }

}

/**
 * Generated class for the Step2 page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-step-2',
  templateUrl: 'step-2.html',
})
export class Step2 {
  step3Page = Step3;
  keyin_id: string;
  public complain_type_id:ComplaintType[] ;
  public complain_name:string = '';
  public channel_id: any = '';
  public subject_id:string = '' ;
  public accused_type_id: any = '';
  public accused_name:string = '' ;
  public wish_detail:string = '';
  public host = 'http://122.155.197.104/sysdamrongdham';
  public auth = this.host+'/api/complaint/key_in';
  public complain_type = this.host+'/api/complaint/key_in';
  public token: string;
  public selectOptions:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public RequestOptions:RequestOptions,public http:Http) {
    this.keyin_id = '251'; 
    this.complain_type_id = [
      new ComplaintType(1, 'key1'),
      new ComplaintType(2, 'key2'),
      new ComplaintType(3, 'key3'),
      new ComplaintType(4, 'key4'),
  ];
}



  ionViewDidLoad() {
    console.log('ionViewDidLoad Step2');

   this.getComplainType().then((data:ComplaintType[]) => {
       this.complain_type_id = data;
    });

  }

  getComplainType(){
    return new Promise((resolve, reject)=>{
      this.http.get(this.complain_type).map(res=> res.json()).subscribe((data) => {
          let complainType:ComplaintType[];
          for(let comp of data){
              complainType.push(new ComplaintType(comp.id, comp.name));
          }

          resolve(complainType);
      })
    });
  }

  saveData(){
    let keyin_id = this.keyin_id;
    let Complaint_data = {
      complain_type_id:this.complain_type_id ,
      complain_name:this.complain_name,
      channel_id: this.channel_id,
      subject_id:this.subject_id,
      accused_type_id: this.accused_type_id,
      accused_name:this.accused_name, 
      wish_detail: this.wish_detail
    }
    
    return new Promise((resolve, reject) => {

      let headers = new Headers();
      headers.append('Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyaWQiOiIxIiwiZnVsbG5hbWUiOiJcdTBlMTlcdTBlMzJcdTBlMjJBZG1pbiBpc3RyYXRvciIsInVzZXJuYW1lIjoiYWRtaW5pc3RyYXRvciIsInBlcm1pc3Npb24iOlsiMjEiLCIyIiwiNSIsIjciLCIxMCIsIjExIiwiMTMiLCIxNCIsIjE1IiwiMTYiLCIxNyIsIjE4IiwiMjAiLCIxOSIsIjIyIiwiMjMiXSwiaWF0IjoxNTAwNzI2MDY5LCJleHAiOjE1MDA4MTI1Njl9.ldvVDx0ruP7-PGJrvnCZPCg8oewVqAHZJgHY85Vaw1c');
      headers.append('Content-Type', 'application/x-www-form-urlencoded');

      let body = "complain_type_id=" + Complaint_data.complain_type_id + "&complain_name=" + Complaint_data.complain_name + "&channel_id=" + Complaint_data.channel_id + "&subject_id=" + Complaint_data.subject_id + "&accused_type_id=" + Complaint_data.accused_type_id + "&accused_name=" + Complaint_data.accused_name + "&wish_detail=" + Complaint_data.wish_detail + "&step=2&keyin_id="+keyin_id;
      let options = new RequestOptions({headers: headers});

      this.http.put(this.auth, body, options).map(res => res).subscribe(
        data => {
          console.log(data['_body']);
          this.navCtrl.push(Step3, {param1: data['_body']});
        },
        err => {
          console.log('Http Error');
          reject(err);
        }
      );

    });
    
   }



}
