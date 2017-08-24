import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Standings, TeamDetails } from '../pages';

@Component({
  selector: 'page-team-home',
  templateUrl: 'team-home.html',
})
export class TeamHome {

  team: any;
  detailsTab = TeamDetails;
  standingsTab = Standings;
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.team = this.navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TeamHome');
  }

  goHome(){
    //this.navCtrl.push(MyTeams);
    this.navCtrl.popToRoot();

  }
}
