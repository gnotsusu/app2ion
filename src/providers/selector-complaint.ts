import {ErrorHandler, Injectable} from '@angular/core';
import {Headers, Http, RequestOptions} from '@angular/http';
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

  complaintType: ComplaintType[];
  accusedType: AccusedType[];
  subject: Subject[];
  channel: Channel[];
  wish: Wish[];
  titleName: TitleName[];

  token: any;

  constructor(public http: Http, public storage: Storage) {
    console.log('Hello SelectorComplaint Provider');

    new Promise(() => {
      this.storage.get('token').then((data: string) => {
        if (data) {
          this.token = "Bearer " + data;
        }
      })
    });

  }

  getComplaintTypeList() {

    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Authorization', this.token);
      let options = new RequestOptions({headers: headers});
      this.http.get(this.complaintTypeList, options).map((res) => res.json()).subscribe((data) => {
        for (let type of data) {
          this.complaintType.push(new ComplaintType(type.id, type.name));
        }
        resolve(this.complaintType);
      }, err => {
        reject(err);
      });

    });
  }

  getAccusedTypeList() {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Authorization', this.token);
      let options = new RequestOptions({headers: headers});
      this.http.get(this.accusedTypeList, options).map(res => res.json()).subscribe(
        (data) => {
          for(let accusedType of data){
            this.accusedType.push(new AccusedType(accusedType.id, accusedType.name));
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
      let headers = new Headers();
      headers.append('Authorization', this.token);
      let options = new RequestOptions({headers: headers});
      this.http.get(this.channelList, options).map(res => res.json()).subscribe(
        (data) => {
          for(let c of data){
            this.channel.push(new Channel(c.id, c.name));
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
      let headers = new Headers();
      headers.append('Authorization', this.token);
      let options = new RequestOptions({headers: headers});
      this.http.get(this.wishList, options).map(res => res.json()).subscribe(
        (data) => {
          for(let w of data){
            this.wish.push(new Wish(w.id, w.name));
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
      let headers = new Headers();
      headers.append('Authorization', this.token);
      let options = new RequestOptions({headers: headers});
      this.http.get(this.subjectList, options).map(res => res.json()).subscribe(
        (data) => {
          for(let s of data){
            this.subject.push(new Subject(s.id, s.name));
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
      let headers = new Headers();
      headers.append('Authorization', this.token);
      let options = new RequestOptions({headers: headers});
      this.http.get(this.titleNameList, options).map(res => res.json()).subscribe(
        (data) => {
          for(let t of data){
            this.titleName.push(new TitleName(t.id, t.name));
          }
          resolve(this.titleName);
        },
        (err) => {
          reject(err);
        });
    });
  }

}
