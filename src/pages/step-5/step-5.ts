import { SelectAddress } from './../../providers/select-address';
import { Subject, Channel, Wish, ComplaintType, SelectorComplaint } from './../../providers/selector-complaint';

import { Login } from './../login/login';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Auth } from './../../providers/auth';
import { Complaint } from './../complaint/complaint';
import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

/**
 * Generated class for the Step5 page.
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
  selector: 'page-step-5',
  templateUrl: 'step-5.html',
})

export class Step5 {
  homePage = HomePage;
  loading: any;
  keyin_id: string;
  public token: any;
  public host = 'http://123.242.172.133/sysdamrongdham';
  public api_keyin = this.host + '/api/complaint/key_in';
  public complain_data: Array<any> = [];
  public tabs: any;

  keyInId: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public auth: Auth,
    public http: Http,
    public SelectorComplaint: SelectorComplaint,
    public selectAddress: SelectAddress,
    public loadCtrl: LoadingController

  ) {
    //console.log('test_data = ' + this.token);
    this.tabs = "tab1";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Step5');
    this.keyin_id = this.navParams.get('param1');
    this.authen();
  }

  authen() {

    this.showLoading();

    this.auth.isCheck().then((data) => {
      this.token = data;
      return data;
    })
      .then((token: string) => {
        return this.auth.isExpire(token);
      })
      .then((isExpire: Boolean) => {
        if (isExpire) {
          this.loading.dismiss();
          this.navCtrl.pop(Login);
        } else {
          this.loading.dismiss();
        }
      }).then((data) => {
        return this.getComplainData(this.token)
      }).then((data2: any) => {
        let data_result: any;
        let complain_type_data = this.SelectorComplaint.getComplaintTypeList().then((data) => {
          for (let i in data) {
            if (data[i].id == data2[0]['complain_type_id']) {
              data_result = data[i].name;
              return data_result;
            }

          }
        }).then((data_result: any) => {
          this.complain_data[0]['complain_type'] = data_result;
          //return this.complain_data;
        });
        return this.complain_data;
      }).then((data2) => {
        let data_result: any;
        let complain_type_data = this.SelectorComplaint.getAccusedTypeList().then((data) => {
          for (let i in data) {
            if (data[i].id == data2[0]['accused_type_id']) {
              data_result = data[i].name;
              return data_result;
            }
          }
        }).then((data_result: any) => {
          this.complain_data[0]['accused_type_id'] = data_result;
        });
        return this.complain_data;
      }).then((data2) => {
        let data_result: any;
        let data_province = data2[0]['address_id'].substring(0, 2) + '000000';
        let complain_type_data = this.selectAddress.Province().then((data) => {
          for (let i in data) {
            // console.log(data[i].id + '==' + data_province);
            if (data[i].id == data_province) {
              data_result = data[i].value;
              return data_result;
            }
          }
        }).then((data_result: any) => {
          this.complain_data[0]['province_data'] = data_result;
        });
        return this.complain_data;
      }).then((data2) => {
        let data_result: any;
        let data_district = data2[0]['address_id'].substring(0, 4) + '0000';
        let complain_type_data = this.selectAddress.District(data2[0]['address_id']).then((data) => {
          for (let i in data) {
            // console.log(data[i].id + '==' + data_district);
            if (data[i].id == data_district) {
              data_result = data[i].value;
              return data_result;
            }
          }
        }).then((data_result: any) => {
          this.complain_data[0]['district_data'] = data_result;
        });
        return this.complain_data;
      }).then((data2) => {
        let data_result: any;
        let data_subdistrict = data2[0]['address_id'].substring(0, 6) + '00';
        let complain_type_data = this.selectAddress.SubDistrict(data2[0]['address_id']).then((data) => {
          for (let i in data) {
            // console.log(data[i].id + '==' + data_subdistrict);
            if (data[i].id == data_subdistrict) {
              data_result = data[i].value;
              return data_result;
            }
          }
        }).then((data_result: any) => {
          this.complain_data[0]['subdistrict_data'] = data_result;
        });
        return this.complain_data;
      }).catch(err => {
        this.loading.dismiss();
        console.error(err.message);
      });
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
    console.log('test_data = ' + token);
    return new Promise((resolve, reject) => {
      this.http.get(this.api_keyin + '/' + keyin_id, options).map(res => res.json()).subscribe((data) => {
        console.log(data);
        let subject: Array<Subject> = [];
        let channel: Array<Channel> = [];
        let wish: Array<Wish> = [];
        let subjectList = data.subject;
        let channelList = data.channel;
        let wishList = data.wish;
        let complain_type = '';
        for (let i in subjectList) {
          console.log('debug :' + subjectList[i].subject_name);
          subject.push(new Subject(subjectList[i].subject_id, subjectList[i].subject_name));
        }

        for (let i in channelList) {
          console.log('debug :' + channelList[i].channel_name);
          channel.push(new Channel(channelList[i].channel_id, channelList[i].channel_name));
        }

        // for (let i of wishList) {
        //   console.log('debug :' + wishList[i].wish_name);
        //   wish.push(new Wish(wishList[i].wish_id, channelList[i].wish_name));
        // }

        this.keyInId = data.keyin_id;
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

}
