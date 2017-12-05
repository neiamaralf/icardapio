import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {ToastController,ModalController} from 'ionic-angular';
import { Api } from '../api/api';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';

import { MainPage,FirstRunPage } from '../../pages/pages';

@Injectable()
export class User {
  private loginErrorString: string;
  _user: any=null;// {id: null,nome: null,token:null};

  constructor(public storage: Storage,
    public translateService: TranslateService,
    public toastCtrl: ToastController,
    public http: Http, 
    public api: Api,
    public modalCtrl:ModalController) {
    this.translateService.get('LOGIN_ERROR').subscribe((value) => {
      this.loginErrorString = value;
    });
    this.loadsusr();
  }

  loadsusr(){
    this.storage.ready().then(() => {
      this.storage.get('usr').then((usr) => {
        this._user=JSON.parse(usr);
        console.log(this._user);
        //console.log(this._user.nome);
        //this.verifytoken(this);

      });
    });

  }

  saveusr(){    
    this.storage.ready().then(() => {
      this.storage.set('usr', JSON.stringify(this._user));
      this.loadsusr();
    });
  }

  isLogged(){

  }

  login(modalctrl:any,loginpage:any,accountInfo: any) {
    this.api.post('login', accountInfo)
    .map(res => res.json())
      .subscribe(res => {
        if (res.status == 'success') {
          //modalctrl.dismiss();
          loginpage.navCtrl.setRoot(MainPage);
          loginpage.navCtrl.popToRoot();
          console.log(this._user);
          this._loggedIn(res);
          console.log(this._user);
        } else {
          let toast = this.toastCtrl.create({
            message: res.msg,
            duration: 3000,
            position: 'top'
          });
          toast.present();          
        }        
      }, err => {
        console.error('ERROR', err);               
      });
  }

  verifytoken(app:any){
    if (app.user._user != null) {
      this.api.post('login', { key: 'asserttoken', id: app.user._user.id, token: app.user._user.token })
        .map(res => res.json())
        .subscribe(res => {
          if (res.status == 'success') {
            console.log(this._user);
            this._loggedIn(res);
            app.rootPage = MainPage;

            console.log(this._user);
          } else {
            let toast = this.toastCtrl.create({
              message: res.msg,
              duration: 3000,
              position: 'top'
            });
            toast.present();
            if (app.settings.settings.option1 == false) {
              app.rootPage = 'LoginPage';
            }
            else app.rootPage = FirstRunPage;
          }
        }, err => {
          console.error('ERROR', err);
        });
    }
    else{
      if (app.settings.settings.option1 == false) {
        app.rootPage = 'LoginPage';
      }
      else app.rootPage = FirstRunPage;
    }

  }
  
  signup(accountInfo: any) {
    let seq = this.api.put('signup', accountInfo).share();

    seq
      .map(res => res.json())
      .subscribe(res => {
        if (res.status == 'success') {
          this._loggedIn(res);
        }
      }, err => {
        console.error('ERROR', err);
      });

    return seq;
  }

  logout(nav) {
    this._user = null;
    this.storage.remove('usr');
    
    //nav.popTo(nav.first());
    nav.setRoot('LoginPage');
    nav.popToRoot();
  }

  _loggedIn(resp) {
    this._user = resp.user;
    this.saveusr();
  }
}
