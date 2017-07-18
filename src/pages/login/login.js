var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Auth } from '../../providers/auth';
import { HomePage } from '../home/home';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
/**
 * Generated class for the Login page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var Login = (function () {
    function Login(navCtrl, http, navParams, auth, loadCtrl) {
        this.navCtrl = navCtrl;
        this.http = http;
        this.navParams = navParams;
        this.auth = auth;
        this.loadCtrl = loadCtrl;
    }
    Login.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad Login');
        this.authen();
    };
    Login.prototype.authen = function () {
        var _this = this;
        this.auth.isCheck()
            .then(function (data) {
            if (data !== "") {
                _this.navCtrl.push(HomePage);
            }
        }).catch(function (err) {
            console.log(err.toString());
        });
    };
    Login.prototype.signIn = function () {
        var _this = this;
        this.showLoading();
        console.log('Login Start');
        var credentials = {
            username: this.username,
            password: this.password
        };
        this.auth.login(credentials).then(function (res) {
            console.log(res);
            _this.loading.dismiss();
            _this.navCtrl.push(HomePage);
        }).catch(function (err) {
            _this.loading.dismiss();
            alert('username or password failure!');
        });
    };
    Login.prototype.showLoading = function () {
        this.loading = this.loadCtrl.create({
            content: 'ยื่นยันตัวตน...'
        });
        this.loading.present();
    };
    return Login;
}());
Login = __decorate([
    IonicPage(),
    Component({
        selector: 'page-login',
        templateUrl: 'login.html',
    }),
    __metadata("design:paramtypes", [NavController, Http, NavParams, Auth, LoadingController])
], Login);
export { Login };
//# sourceMappingURL=login.js.map