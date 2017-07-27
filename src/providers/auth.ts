import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http'
import {Storage} from '@ionic/storage';
//import {JwtHelper} from 'angular2-jwt';
import 'rxjs/add/operator/map';

/*
 Generated class for the Auth provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular DI.
 */

export class UserProfiles{
  user: User;
  groups: Groups[];

  constructor(user: User, groups: Groups[]) {
    this.user = user;
    this.groups = groups;
  }

}

export class User {

  id : string;
  username: string;
  email:string;
  first_name:string;
  last_name:string;
  company:string;
  phone:string;
  idcard:string;
  gender:string;

  constructor(id: string, username: string, email: string, first_name: string, last_name: string, company: string, phone: string, idcard: string, gender: string) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.first_name = first_name;
    this.last_name = last_name;
    this.company = company;
    this.phone = phone;
    this.idcard = idcard;
    this.gender = gender;
  }
}

export class Groups {
  id:string;
  name:string;
  description:string;
  bgColor:string;

  constructor(id: string, name: string, description: string, bgColor: string) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.bgColor = bgColor;
  }

}

@Injectable()
export class Auth {

  public host = 'http://122.155.197.104/sysdamrongdham';
  public auth = this.host+'/api/authen/token';
  public info = this.host+'/api/authen/token_info';
  public token: string;

  public userInfo : User;
  public groups : Groups[];

  constructor(public http: Http, public storage: Storage) {
  }

  public isCheck() {
    return new Promise((resolve, reject)=> {
      this.storage.get('token').then( (data:string) => {
          console.log('data login : ', data);
          this.token = data;
          resolve(data);
      }).catch((err:string) => {
        reject(err);
      })
    });

  }

  public isExpire(token:string){
    return new Promise((resolve, reject)=>{
      if(token) {
        let headers = new Headers();
        headers.append('Authorization', 'Bearer ' + token);
        let options = new RequestOptions({headers: headers});
        this.http.get(this.info, options).map(res => res.json()).subscribe(
          data => {
            console.log(data.error);
            if (data.error) {
              resolve(true);
            } else {
              resolve(false);
            }
          },
          (err) => {
            if (err.status == 401) {

              this.storage.clear().then(() => console.log('storage clear'));
              resolve(true);
            } else {
              reject(err);
            }
            //reject(err);
          }
        );
      }else{
        //console.log('Token is empty!!!');
        reject('Token is empty!!!');
      }
    });
  }

  public login(credentials) {

    return new Promise((resolve, reject) => {

      let headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');

      let body = "username=" + credentials.username + "&password=" + credentials.password;
      let options = new RequestOptions({headers: headers});

      this.http.post(this.auth, body, options).map(res => res.json()).subscribe(
        data => {
          console.log('Http Success');
          this.token = data.token;
          this.storage.set('token', this.token).then(
            () => {
              resolve(data.token);
            }).catch((err) => {
             console.log(err.toString());
             reject(err);
          });
        },
        err => {
          console.log('Http Error');
          reject(err);
        }
      );

    });
  }

  public clearAutherize(){
     return new Promise((resolve, reject) => {

       this.storage.clear().then(()=> {
         setTimeout(resolve(true), 1500);
       }).catch((err) =>{
         reject(err);
       });
     });
  }

  public getUserProfile() {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Authorization', 'Bearer '+this.token);
      let position = new RequestOptions({headers: headers});
      this.http.get(this.info, position).map(res => res.json()).subscribe(
        data => {
          let user = data.user;
          let groups = data.groups;

          this.userInfo = new User(user.id, user.username,user.email, user.first_name, user.last_name, user.company, user.phone, user.idcard, user.gender);

          for(let group of groups){
            this.groups.push(new Groups(group.id, group.name, group.description, group.bgcolor))
          }

          resolve(new UserProfiles(this.userInfo, this.groups));
        },
        err => {
          reject(err);
        })
    })
  }

}
