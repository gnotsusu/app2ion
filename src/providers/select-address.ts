import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';


 // type Address = { AddressId: string, AddressName: string};
/*
  Generated class for the SelectAddress provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class SelectAddress {
  host: string = "http://122.155.197.104/sysdamrongdham/api/dropdown/ccaa_lists/";
  address: object[] = [];

  constructor(public http: Http) {
    //console.log('Hello SelectAddress Provider');
  }


  Province(){
    let url = this.host+'Changwat';
    return new Promise((resolve, reject) => {
      this.http.get(url).map(res => res.json()).subscribe(
        (data) => {
              this.address =[];
            Object.keys(data).forEach((key) => {
              this.address.push({id:key,value:data[key].replace('จังหวัด','')});
            });
          resolve(this.address);
        },
        (err) => {
          reject(err);
        });
    });
  }

  District(province:string){
    let url = this.host+'Aumpur/'+province.substring(0,2);
    return new Promise((resolve, reject) => {
      this.http.get(url).map(res => res.json()).subscribe(
        (data) => {
          this.address =[];
          Object.keys(data).forEach((key) => {
            this.address.push({id:key,value:data[key].replace('อำเภอ','')});
          });
          resolve(this.address);
        },
        (err) => {
          reject(err);
        });
    });
  }

  SubDistrict(district:string){
    let url = this.host+'Tamboon/'+district.substring(0,4);
    return new Promise((resolve, reject) => {
      this.http.get(url).map(res => res.json()).subscribe(
        (data) => {
          this.address =[];
          Object.keys(data).forEach((key) => {
            this.address.push({id:key,value:data[key].replace('ตำบล','')});
          });
          resolve(this.address);
        },
        (err) => {
          reject(err);
        });
    });
  }

}
