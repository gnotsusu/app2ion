import {ErrorHandler, Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {Storage} from '@ionic/storage';

export class ComplaintType {

  id: string;
  name: string;

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }

}

export class AccusedType {

  id: string;
  name: string;

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }

}

export class Subject {

  id: string;
  name: string;

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }

}

export class Channel {

  id: string;
  name: string;

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }

}

export class Wish {
  id: string;
  name: string;

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }

}

export class TitleName {
  id: string;
  name: string;

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }

}

/*
  Generated class for the SelectorComplaint provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class SelectorComplaint {

  host: string = "http://122.155.197.104/sysdamrongdham";
  accusedTypeList: string = this.host + "/api/dropdown/accused_type_lists";
  complaintTypeList: string = this.host + "/api/dropdown/complain_type_lists";
  subjectList: string = this.host + "/api/dropdown/subject_lists";
  channelList: string = this.host + "/api/dropdown/channel_lists";
  wishList: string = this.host + "/api/dropdown/wish_lists";
  titleNameList: string = this.host + "/api/dropdown/title_name_lists";

  complaintType: Array<any> = [];
  accusedType: Array<any> = [];
  subject: Array<any> = [];
  channel: Array<any> = [];
  wish: Array<any> = [];
  titleName: Array<any> = [];

  token: any;

  constructor(public http: Http, public storage: Storage) {
    console.log('Hello SelectorComplaint Provider');
  }

  getComplaintTypeList() {

    return new Promise((resolve, reject) => {
      this.http.get(this.complaintTypeList).map((res) => res.json()).subscribe((data) => {
        for (let index in data) {
          this.complaintType.push(new ComplaintType( index, data[index]));
        }
        resolve(this.complaintType);
      }, err => {
        reject(err);
      });

    });
  }

  getAccusedTypeList() {
    return new Promise((resolve, reject) => {
      this.http.get(this.accusedTypeList).map(res => res.json()).subscribe(
        (data) => {

          for(let i in data){
            this.accusedType.push(new AccusedType(i, data[i]));
          }
          resolve(this.accusedType);
        },
        (err) => {
          reject(err);
        });

    });
  }

  getChannelList(){
    return new Promise((resolve, reject) => {
      this.http.get(this.channelList).map(res => res.json()).subscribe(
        (data) => {
          for (let index in data) {
            this.channel.push(new ComplaintType( index, data[index]));
          }
          resolve(this.channel);
        },
        (err) => {
          reject(err);
        });
    });
  }

  getWishList(){
    return new Promise((resolve, reject) => {
      this.http.get(this.wishList).map(res => res.json()).subscribe(
        (data) => {
          for (let index in data) {
            this.wish.push(new ComplaintType( index, data[index]));
          }
          resolve(this.wish);
        },
        (err) => {
          reject(err);
        });
    });
  }

  getSubjectList(){
    return new Promise((resolve, reject) => {
      this.http.get(this.subjectList).map(res => res.json()).subscribe(
        (data) => {
          for (let index in data) {
            this.subject.push(new ComplaintType( index, data[index]));
          }
          resolve(this.subject);
        },
        (err) => {
          reject(err);
        });
    });
  }

  getTitleNameList(){
    return new Promise((resolve, reject) => {
      this.http.get(this.titleNameList).map(res => res.json()).subscribe(
        (data) => {
          for (let index in data) {
            this.titleName.push(new ComplaintType( index, data[index]));
          }
          resolve(this.titleName);
        },
        (err) => {
          reject(err);
        });
    });
  }

  getComplaintTypeListByParent(parent_id:string) {
    let url = this.complaintTypeList+'//parent_id/'+parent_id;
    return new Promise((resolve, reject) => {
      this.http.get(url).map((res) => res.json()).subscribe((data) => {
        this.complaintType = [];
        for (let index in data) {
          this.complaintType.push(new ComplaintType( index, data[index]));
        }
        resolve(this.complaintType);
      }, err => {
        reject(err);
      });

    });
  }

  getAccusedTypeListByParent(parent_id:string) {
    let url = this.accusedTypeList+'/'+parent_id;
    return new Promise((resolve, reject) => {
      this.http.get(url).map(res => res.json()).subscribe(
        (data) => {
          this.accusedType = [];
          for(let i in data){
            this.accusedType.push(new AccusedType(i, data[i]));
          }
          resolve(this.accusedType);
        },
        (err) => {
          reject(err);
        });

    });
  }
}
