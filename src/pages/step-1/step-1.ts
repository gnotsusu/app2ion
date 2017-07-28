import { FormGroup, FormBuilder, Validators  } from '@angular/forms';
import { Login } from './../login/login';
import { Auth } from './../../providers/auth';
import { Storage } from '@ionic/storage';
import { RequestOptions, Http, Headers, URLSearchParams } from '@angular/http';
import { Step2 } from './../step-2/step-2';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';


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
  public api_save = this.host+'/api/complaint/key_in';
  public token: any;
  loading : any;
  complainForm:FormGroup;
  submitAttempt: boolean = false;
  


 

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public RequestOptions:RequestOptions,
    public http:Http,
    public auth:Auth,
    public loadCtrl:LoadingController,
    public formBuilder:FormBuilder) {      
      this.complainForm = formBuilder.group({
        complain_date: ['',Validators.required],
        recipient: ['',Validators.required]
    });
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Step1');
    this.authen();
    //this.token = this.auth.token;
  }

  authen(){

    this.showLoading();

    this.auth.isCheck().then((data) => {
        this.token = data;
        
        return data;
    }).then( (token:string) => {
        return this.auth.isExpire(token);
    }).then((isExpire:Boolean) => {
      if (isExpire ) {
        this.loading.dismiss();
        this.navCtrl.pop(Login);
      }else{
        this.loading.dismiss();
      } 
    }).catch(err => {
      this.loading.dismiss();
      console.error(err.message);
    });
  }

  showLoading(){
    this.loading = this.loadCtrl.create({
      content : 'กำลังยื่นยันตัวตน...'
    });
    this.loading.present();
  }

  saveData(){
    this.submitAttempt = true;
    let Complaint_data = {
      complain_date:this.complain_date ,
      recipient:this.recipient,
      doc_receive_date: this.doc_receive_date,
      doc_receive_no:this.doc_receive_no,
      doc_send_date: this.doc_send_date,
      doc_send_no:this.doc_send_no, 
      user_complain_type_id: this.user_complain_type_id
    }
    let token_data = this.token;

    let complain_date_ex:string[] = [];
    let doc_receive_date_ex:string[] = [];
    let doc_send_date_ex:string[] = [];
if(this.complainForm.valid){
    return new Promise((resolve, reject) => {      
      let headers = new Headers();
      headers.append('Authorization','Bearer '+ token_data);
      headers.append('Content-Type', 'application/x-www-form-urlencoded');

      let body = new URLSearchParams();
      if(Complaint_data.complain_date != ""){
        complain_date_ex = Complaint_data.complain_date.split("-");
        body.set('complain_date',complain_date_ex[2]+"/"+complain_date_ex[1]+"/"+(parseInt(complain_date_ex[0])+543));
      }

      if(Complaint_data.doc_receive_date != ""){
        doc_receive_date_ex = Complaint_data.doc_receive_date.split("-");
        body.set('doc_receive_date',doc_receive_date_ex[2]+"/"+doc_receive_date_ex[1]+"/"+(parseInt(doc_receive_date_ex[0])+543));
      }

      if(Complaint_data.doc_send_date != ""){
        doc_send_date_ex = Complaint_data.doc_send_date.split("-");
        body.set('doc_send_date',doc_send_date_ex[2]+"/"+doc_send_date_ex[1]+"/"+(parseInt(doc_send_date_ex[0])+543));
      }
      
      body.set('recipient',Complaint_data.recipient);      
      body.set('doc_receive_no',Complaint_data.doc_receive_no);      
      body.set('doc_send_no',Complaint_data.doc_send_no);
      body.set('user_complain_type_id',Complaint_data.user_complain_type_id);
      body.set('step','1');
      let options = new RequestOptions({headers: headers});

      this.http.post(this.api_save, body, options).map(res => res).subscribe(
        data => {
          console.log(data['_body']);
          this.navCtrl.push(Step2, {param1: data['_body']});
        },
        err => {
          console.log(token_data);
          console.log('Http Error');
          reject(err);
        }
      );

    });
    
   }
  }

}
