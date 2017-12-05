import { Component } from '@angular/core';
import { IonicPage, MenuController, NavController, Platform,ModalController } from 'ionic-angular';

import { TranslateService } from '@ngx-translate/core';
import { LoginPage } from '../login/login';
import { User } from '../../providers/providers';
import { Settings } from '../../providers/providers';
import { MainPage } from '../../pages/pages';

export interface Slide {
  title: string;
  description: string;
  image: string;
}

@IonicPage()
@Component({
  selector: 'page-tutorial',
  templateUrl: 'tutorial.html'
})
export class TutorialPage {
  slides: Slide[];
  showSkip = true;
  dir: string = 'ltr';

  dontshow=false;

  showtut(){
    console.log(this.dontshow);
    this.settings.setValue('option1',!this.dontshow);
    console.log(this.settings);

  }

  constructor(public navCtrl: NavController, public menu: MenuController, translate: TranslateService, public platform: Platform,
    public modalCtrl:ModalController,public user: User,public settings: Settings) {
     
    this.dir = platform.dir();
    translate.get(["TUTORIAL_SLIDE1_TITLE",
      "TUTORIAL_SLIDE1_DESCRIPTION",
      "TUTORIAL_SLIDE2_TITLE",
      "TUTORIAL_SLIDE2_DESCRIPTION",
      "TUTORIAL_SLIDE3_TITLE",
      "TUTORIAL_SLIDE3_DESCRIPTION",
    ]).subscribe(
      (values) => {
        console.log('Loaded values', values);
        this.slides = [
          {
            title: values.TUTORIAL_SLIDE1_TITLE,
            description: values.TUTORIAL_SLIDE1_DESCRIPTION,
            image: 'assets/img/ica-slidebox-img-1.png',
          },
          {
            title: values.TUTORIAL_SLIDE2_TITLE,
            description: values.TUTORIAL_SLIDE2_DESCRIPTION,
            image: 'assets/img/ica-slidebox-img-2.png',
          },
          {
            title: values.TUTORIAL_SLIDE3_TITLE,
            description: values.TUTORIAL_SLIDE3_DESCRIPTION,
            image: 'assets/img/ica-slidebox-img-3.png',
          }
        ];
      });
  }

  startApp() {
    LoginPage.showlogin(this.modalCtrl);
  }

  onSlideChangeStart(slider) {
    this.showSkip = !slider.isEnd();
  }

  ionViewDidEnter() {

    this.menu.enable(false);
  }

  ionViewWillLeave() {
    // enable the root left menu when leaving the tutorial page
    this.menu.enable(true);
  }

}
