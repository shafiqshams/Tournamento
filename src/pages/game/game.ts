import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Api } from '../../providers/api';
import { MapPage, TeamHome } from '../pages';
import * as _ from 'lodash';
declare var window: any;


@Component({
  selector: 'page-game',
  templateUrl: 'game.html',
})
export class Game {

  game: any;
  team1s: string;
  team2s: string;
  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private api: Api
  ) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Game');
    this.game = this.navParams.data;
    console.log(this.game);
    this.game.gameTime = Date.parse(this.game.time);
  }

  teamTapped(id) {
    let tourneyData = this.api.getCurrentTourney();
    let team = tourneyData.teams.find(t => t.id === id);
    this.navCtrl.push(TeamHome, team) // page and parameter
  }

  isWinner(score1, score2) {
    return Number(score1) > Number(score2);
  }

  goToMap() {
    this.navCtrl.push(MapPage, this.game);
  }

  goToDirections() {
    let tourneyData = this.api.getCurrentTourney();
    let location = tourneyData.locations[this.game.locationId];
    window.location = `geo:${location.latitude},${location.longitude};u=35;`;
  }

  goHome(){
    //this.navCtrl.push(MyTeams);
    this.navCtrl.popToRoot();

  }
}
