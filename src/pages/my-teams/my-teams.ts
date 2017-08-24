import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { Api } from '../../providers/api';
import { Usersettings } from '../../providers/usersettings';

import { Tournaments, TeamHome } from '../pages';

@Component({
  selector: 'page-my-teams',
  templateUrl: 'my-teams.html',
})
export class MyTeams {

  // favs = [
  //       {
  //           team: { id: 6182, name: 'HC Elite 7th', coach: 'Michelotti' },
  //           tournamentId: '89e13aa2-ba6d-4f55-9cc2-61eba6172c63',
  //           tournamentName: 'March Madness Tournament'
  //       },
  //       {
  //           team: { id: 805, name: 'HC Elite', coach: 'Michelotti' },
  //           tournamentId: '98c6857e-b0d1-4295-b89e-2d95a45437f2',
  //           tournamentName: 'Holiday Hoops Challenge'
  //       }
  //   ];

  favs = [];

  constructor(
    private navCtrl: NavController,
    private loadingController: LoadingController,
    private api: Api,
    private usersettings: Usersettings,
    private alertCtrl: AlertController) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyTeams');
  }

  goToTourny() {
    this.navCtrl.push(Tournaments);
  }

  favTapped($event, fav) {
    let loader = this.loadingController.create({
      content: 'Getting data...',
      spinner: 'bubbles',
      dismissOnPageChange: true
    });
    loader.present();

    this.api.getTournamentData(fav.tournamentId)
      .subscribe(t => {
        this.navCtrl.push(TeamHome, fav.team);
      }, error => {
        loader.dismiss();
        let alert = this.alertCtrl.create({
          title: 'Error',
          subTitle: 'Please check your internet connection!',
          buttons: ['Ok']
        });
        alert.present();
      });
  }

  ionViewDidEnter() {
    this.favs = this.usersettings.getAllFavorites();
    console.log("favs: " + this.favs);
  }

}
