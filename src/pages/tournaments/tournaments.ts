import { Component } from '@angular/core';
import {NavController, LoadingController, AlertController } from 'ionic-angular';
import { Teams } from '../pages';
import { Api } from '../../providers/api';

@Component({
  selector: 'page-tournaments',
  templateUrl: 'tournaments.html',
})
export class Tournaments {

  tournaments: any;
  constructor(
    public navCtrl: NavController,
    private api: Api,
    public loadingCtrl: LoadingController,
    private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    let loading = this.loadingCtrl.create({
    content: 'Please wait...',
    spinner: 'bubbles'
    });
    loading.present().then( () => {
      this.api.getTournaments()
        .subscribe( data => {
        this.tournaments = data;
        loading.dismiss();
      }, error => {
        loading.dismiss();
        let alert = this.alertCtrl.create({
          title: 'Error',
          subTitle: 'Please check your internet connection!',
          buttons: [
            {
              text: 'OK',
              handler: () => {
                //console.log( 'OK Clicked');
                this.navCtrl.pop();
              }
            }
          ]

        });
        alert.present();
      });
    });
  }

  tapped($event, tourney){
    this.navCtrl.push(Teams, tourney);
  }

  goHome(){
    //this.navCtrl.push(MyTeams);
    this.navCtrl.popToRoot();

  }


}
