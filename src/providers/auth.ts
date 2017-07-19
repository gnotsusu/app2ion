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

export class User {

  id : string;
  fullName: string;
  userName: string;

  constructor(id: string, userName: string, fullName : string) {
    this.id = id;
    this.userName = userName;
    this.fullName = fullName;
  }

}

@Injectable()
export class Auth {

  public host = 'http://122.155.197.104/sysdamrongdham';
  public auth = this.host+'/api/authen/token';
  public info = this.host+'/api/authen/token_infon';
  public token: string;

  public userInfo : User;

  constructor(public http: Http, public storage: Storage) {
  }

  public isCheck() {

    return new Promise((resolve, reject)=> {
      this.storage.get('token').then( (data) =>{
        if(data) {
          console.log('data login : ', data);
          resolve(true);
        }
      }).catch( (err) => {
        reject(err.toString());
      })
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

  public getUserInfo() {
    return new Promise((resolve, reject) => {
      this.http.get(this.info).map(res => res.json()).subscribe(
        data => {
          resolve(new User(data.id, data.username, data.fullname));
        },
        err => {
          reject(err);
        })
    })
  }

}
