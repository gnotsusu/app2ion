import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Login } from './../login/login';
import { Auth } from './../../providers/auth';
import { Storage } from '@ionic/storage';
import { RequestOptions, Http, Headers, URLSearchParams } from '@angular/http';
import { Step2 } from './../step-2/step-2';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import moment from 'moment';

/**
 * Generated class for the Step1 page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

export class ComplaintData {
  keyin_id: any;
  create_user_id: any;
  update_user_id: any;
  complain_no: any;
  complain_date: any;
  recipient: any;
  doc_receive_date: any;
  doc_receive_no: any;
  doc_send_date: any;
  doc_send_no: any;
  complain_type_id: any;
  complain_type: any;
  complain_name: any;
  channel_id: any;
  subject_id: any;
  user_complain_type_id: any;
  id_card: any;
  pn_id: any;
  first_name: any;
  last_name: any;
  phone_number: any;
  accused_type_id: any;
  accused_name: any;
  scene_date: any;
  place_scene: any;
  address_id: any;
  complaint_detail: any;
  latitude: any;
  longitude: any;
  wish_detail: any;
  receive_date: any;
  reply_date: any;
  send_org_id: any;
  send_org_date: any;
  current_status_id: any;
  create_datetime: any;
  update_datetime: any;
  step: any;
  complaint_type: any;
  wish: any[] = [];
  title_name: any;
  subject: any[] = [];
  channel: any[] = [];
  attach_file: any;
  user_complain: any;

  constructor(
    keyin_id: any,
    create_user_id: any,
    update_user_id: any,
    complain_no: any,
    complain_date: any,
    recipient: any,
    doc_receive_date: any,
    doc_receive_no: any,
    doc_send_date: any,
    doc_send_no: any,
    complain_type_id: any,
    complain_type: any,
    complain_name: any,
    channel_id: any,
    subject_id: any,
    user_complain_type_id: any,
    id_card: any,
    pn_id: any,
    first_name: any,
    last_name: any,
    phone_number: any,
    accused_type_id: any,
    accused_name: any,
    scene_date: any,
    place_scene: any,
    address_id: any,
    complaint_detail: any,
    latitude: any,
    longitude: any,
    wish_detail: any,
    receive_date: any,
    reply_date: any,
    send_org_id: any,
    send_org_date: any,
    current_status_id: any,
    create_datetime: any,
    update_datetime: any,
    step: any,
    complaint_type: any,
    wish: Array<any> = [],
    title_name: any,
    subject: Array<any> = [],
    channel: Array<any> = [],
    attach_file: any,
    user_complain: any
  ) {
    this.keyin_id = keyin_id;
    this.create_user_id = create_user_id;
    this.update_user_id = update_user_id;
    this.complain_no = complain_no;
    this.complain_date = complain_date;
    this.recipient = recipient;
    this.doc_receive_date = doc_receive_date;
    this.doc_receive_no = doc_receive_no;
    this.doc_send_date = doc_send_date;
    this.doc_send_no = doc_send_no;
    this.complain_type_id = complain_type_id;
    this.complain_type = complain_type;
    this.complain_name = complain_name;
    this.channel_id = channel_id;
    this.subject_id = subject_id;
    this.user_complain_type_id = user_complain_type_id;
    this.id_card = id_card;
    this.pn_id = pn_id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.phone_number = phone_number;
    this.accused_type_id = accused_type_id;
    this.accused_name = accused_name;
    this.scene_date = scene_date;
    this.place_scene = place_scene;
    this.address_id = address_id;
    this.complaint_detail = complaint_detail;
    this.latitude = latitude;
    this.longitude = longitude;
    this.wish_detail = wish_detail;
    this.receive_date = receive_date;
    this.reply_date = reply_date;
    this.send_org_id = send_org_id;
    this.send_org_date = send_org_date;
    this.current_status_id = current_status_id;
    this.create_datetime = create_datetime;
    this.update_datetime = update_datetime;
    this.step = step;
    this.complaint_type = complaint_type;
    this.wish = wish;
    this.title_name = title_name;
    this.subject = subject;
    this.channel = channel;
    this.attach_file = attach_file;
    this.user_complain = user_complain;
  }

  public toString(): string {
    return "keyin_id : " + this.keyin_id;
  }
}
@IonicPage()
@Component({
  selector: 'page-step-1',
  templateUrl: 'step-1.html',
})


export class Step1 {
  step2Page = Step2;
  public complain_date: any = '';
  public recipient: string = '';
  public doc_receive_date: any = '';
  public user_data: any = '';
  public doc_receive_no: string = '';
  public doc_send_date: any = '';
  public doc_send_no: string = '';
  public user_complain_type_id: string = '';
  public host = 'http://123.242.172.133/sysdamrongdham';
  public api_save = this.host + '/api/complaint/key_in';
  public api_keyin = this.host + '/api/complaint/key_in';
  public token: any;
  loading: any;
  complainForm: FormGroup;
  submitAttempt: boolean = false;
  public keyin_id: any;
  public complain_data: Array<any> = [];






  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public RequestOptions: RequestOptions,
    public http: Http,
    public auth: Auth,
    public loadCtrl: LoadingController,
    public formBuilder: FormBuilder) {
    this.complainForm = formBuilder.group({
      complain_date: ['', Validators.required],
      recipient: ['', Validators.required]
    });
    this.complain_date = 'a';
    this.keyin_id = this.navParams.get('param1');

  }

  authen() {

    this.showLoading();

    this.auth.isCheck().then((data) => {
      this.token = data;
      return data;
    }).then((token: string) => {
      return this.auth.isExpire(token);
    }).then((isExpire: Boolean) => {
      if (isExpire) {
        this.loading.dismiss();
        this.navCtrl.pop(Login);
      } else {
        this.loading.dismiss();
      }
    }).then((data) => {
      if (this.keyin_id != undefined) {
        return this.getComplainData(this.token);
      } else {
        return this.complain_data;
      }
    }).then((data) => {
      console.log(data);
      if (data != undefined) {
        if (data[0]['complain_date'] != '') {
          let cd_tmp = data[0]['complain_date'].toString().split(' ');
          let cd_tmp_splt = cd_tmp[0].split('-');
          this.complain_date = new Date(cd_tmp_splt[0] + '-' + cd_tmp_splt[1] + '-' + cd_tmp_splt[2]).toISOString();
        }

        if (data[0]['doc_receive_date'] != '') {
          let cd_tmp = data[0]['doc_receive_date'].toString().split(' ');
          let cd_tmp_splt = cd_tmp[0].split('-');
          this.doc_receive_date = new Date(cd_tmp_splt[0] + '-' + cd_tmp_splt[1] + '-' + cd_tmp_splt[2]).toISOString();
        }

        if (data[0]['compldoc_send_dateain_date'] != '') {
          let cd_tmp = data[0]['doc_send_date'].toString().split(' ');
          let cd_tmp_splt = cd_tmp[0].split('-');
          this.doc_send_date = new Date(cd_tmp_splt[0] + '-' + cd_tmp_splt[1] + '-' + cd_tmp_splt[2]).toISOString();
        }
        this.recipient = data[0]['recipient'];
        this.doc_receive_no = data[0]['doc_receive_no'];
        this.doc_send_no = data[0]['doc_send_no'];
        this.user_complain_type_id = data[0]['user_complain_type_id'];
      }
      return data;
    }).catch(err => {
      this.loading.dismiss();
      console.error(err.message);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Step1');
    this.authen();

    this.auth.getUserProfile().then((data) => {
      this.user_data = data;
      console.log(this.user_data);
    }).catch(err => {
      console.error(err.message);
    });
    //this.token = this.auth.token;
  }

  showLoading() {
    this.loading = this.loadCtrl.create({
      content: 'กำลังยื่นยันตัวตน...'
    });
    this.loading.present();
  }

  getComplainData(token: string) {
    let keyin_id = this.keyin_id;
    let headers = new Headers();
    headers.append('Authorization', 'Bearer ' + token);
    let options = new RequestOptions({ headers: headers });
    return new Promise((resolve, reject) => {
      this.http.get(this.api_keyin + '/' + keyin_id, options).map(res => res.json()).subscribe((data) => {
        let subject = [];
        let channel = [];
        let wish = [];
        let subjectList = data.subject;
        let channelList = data.channel;
        let wishList = data.wish;
        let complain_type = '';

        let user_complain: any;
        if (data.user_complain_type_id == '1') {
          user_complain = 'ไม่ประสงค์ออกนาม';
        } else {
          user_complain = data.title_name + data.first_name + ' ' + data.last_name;
        }
        this.complain_data.push(new ComplaintData(
          data.keyin_id,
          data.create_user_id,
          data.update_user_id,
          data.complain_no,
          data.complain_date,
          data.recipient,
          data.doc_receive_date,
          data.doc_receive_no,
          data.doc_send_date,
          data.doc_send_no,
          data.complain_type_id,
          complain_type,
          data.complain_name,
          data.channel_id,
          data.subject_id,
          data.user_complain_type_id,
          data.id_card,
          data.pn_id,
          data.first_name,
          data.last_name,
          data.phone_number,
          data.accused_type_id,
          data.accused_name,
          data.scene_date,
          data.place_scene,
          data.address_id,
          data.complaint_detail,
          data.latitude,
          data.longitude,
          data.wish_detail,
          data.receive_date,
          data.reply_date,
          data.send_org_id,
          data.send_org_date,
          data.current_status_id,
          data.create_datetime,
          data.update_datetime,
          data.step,
          data.complaint_type,
          wish,
          data.title_name,
          subject,
          channel,
          data.attach_file,
          user_complain
        ));

        console.log("Log Complanit :" + this.complain_data[0].toString());
        resolve(this.complain_data);
      })
    });
  }

  saveData() {
    this.submitAttempt = true;
    let Complaint_data;
    if (this.user_complain_type_id == '2') {
      Complaint_data = {
        complain_date: this.complain_date,
        recipient: this.recipient,
        doc_receive_date: this.doc_receive_date,
        doc_receive_no: this.doc_receive_no,
        doc_send_date: this.doc_send_date,
        doc_send_no: this.doc_send_no,
        user_complain_type_id: this.user_complain_type_id,
        id_card: this.user_data.user.idcard,
        first_name: this.user_data.user.first_name,
        last_name: this.user_data.user.last_name,
        phone_number: this.user_data.user.phone
      }
    } else {
      Complaint_data = {
        complain_date: this.complain_date,
        recipient: this.recipient,
        doc_receive_date: this.doc_receive_date,
        doc_receive_no: this.doc_receive_no,
        doc_send_date: this.doc_send_date,
        doc_send_no: this.doc_send_no,
        user_complain_type_id: this.user_complain_type_id,
        id_card: "",
        first_name: "",
        last_name: "",
        phone_number: ""
      }
    }
    console.log(Complaint_data);
    let token_data = this.token;
    let keyin_id = this.keyin_id;

    let complain_date_ex: string[] = [];
    let doc_receive_date_ex: string[] = [];
    let doc_send_date_ex: string[] = [];
    if (this.complainForm.valid) {
      return new Promise((resolve, reject) => {
        let headers = new Headers();
        headers.append('Authorization', 'Bearer ' + token_data);
        headers.append('Content-Type', 'application/x-www-form-urlencoded');

        let body = new URLSearchParams();
        if (Complaint_data.complain_date != "") {
          complain_date_ex = Complaint_data.complain_date.split("-");
          body.set('complain_date', complain_date_ex[2] + "/" + complain_date_ex[1] + "/" + (parseInt(complain_date_ex[0]) + 543) + " 00:00:00");
        }

        if (Complaint_data.doc_receive_date != "") {
          doc_receive_date_ex = Complaint_data.doc_receive_date.split("-");
          body.set('doc_receive_date', doc_receive_date_ex[2] + "/" + doc_receive_date_ex[1] + "/" + (parseInt(doc_receive_date_ex[0]) + 543) + " 00:00:00");
        }

        if (Complaint_data.doc_send_date != "") {
          doc_send_date_ex = Complaint_data.doc_send_date.split("-");
          body.set('doc_send_date', doc_send_date_ex[2] + "/" + doc_send_date_ex[1] + "/" + (parseInt(doc_send_date_ex[0]) + 543) + " 00:00:00");
        }

        if (keyin_id != undefined && keyin_id != '') {
          body.set('keyin_id', keyin_id);
        }

        body.set('recipient', Complaint_data.recipient);
        body.set('doc_receive_no', Complaint_data.doc_receive_no);
        body.set('doc_send_no', Complaint_data.doc_send_no);
        body.set('user_complain_type_id', Complaint_data.user_complain_type_id);
        body.set('id_card', Complaint_data.id_card);
        body.set('first_name', Complaint_data.first_name);
        body.set('last_name', Complaint_data.last_name);
        body.set('phone_number', Complaint_data.phone_number);
        body.set('step', '1');
        let options = new RequestOptions({ headers: headers });

        if (keyin_id != undefined && keyin_id != '') {
          this.http.put(this.api_save, body, options).map(res => res).subscribe(
            data => {
              console.log(data['_body']);
              this.navCtrl.push(Step2, { param1: data['_body'] });
            },
            err => {
              console.log(token_data);
              console.log('Http Error');
              reject(err);
            }
          );
        } else {
          this.http.post(this.api_save, body, options).map(res => res).subscribe(
            data => {
              console.log(data['_body']);
              this.navCtrl.push(Step2, { param1: data['_body'] });
            },
            err => {
              console.log(token_data);
              console.log('Http Error');
              reject(err);
            }
          );
        }


      });

    }
  }

}
