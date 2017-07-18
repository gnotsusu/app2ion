var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Storage } from '@ionic/storage';
//import {JwtHelper} from 'angular2-jwt';
import 'rxjs/add/operator/map';
/*
 Generated class for the Auth provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular DI.
 */
var User = (function () {
    function User(userName, password) {
        this.userName = userName;
        this.password = password;
    }
    return User;
}());
export { User };
var Auth = (function () {
    function Auth(http, storage) {
        this.http = http;
        this.storage = storage;
        this.host = 'http://122.155.197.104/sysdamrongdham';
        this.auth = '/api/authen/token';
        this.info = '/api/authen/token_infon';
    }
    Auth.prototype.isCheck = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.storage.get('token').then(function () {
                resolve(true);
            }).catch(function (err) {
                reject(err.toString());
            });
        });
    };
    Auth.prototype.login = function (credentials) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var headers = new Headers();
            headers.append('Content-Type', 'application/x-www-form-urlencoded');
            var body = "username=" + credentials.username + "&password=" + credentials.password;
            var options = new RequestOptions({ headers: headers });
            _this.http.post(_this.auth, body, options).map(function (res) { return res.json(); }).subscribe(function (data) {
                console.log('Http Success');
                _this.token = data.token;
                _this.storage.set('token', _this.token).then(function () {
                    resolve(data.token);
                }).catch(function (err) {
                    console.log(err.toString());
                    reject(err);
                });
            }, function (err) {
                console.log('Http Error');
                reject(err);
            });
        });
    };
    Auth.prototype.clearAutherize = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.storage.clear().then(function () {
                resolve(true);
            }).catch(function (err) {
                reject(err.toString());
            });
        });
    };
    Auth.prototype.getUserInfo = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.get(_this.http + _this.info).subscribe(function (data) {
                _this.userInfo = new User();
            }, function (err) {
            });
        });
    };
    return Auth;
}());
Auth = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Http, Storage])
], Auth);
export { Auth };
//# sourceMappingURL=auth.js.map