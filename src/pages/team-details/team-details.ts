import { Component } from '@angular/core';
import { ToastController, AlertController, NavController, NavParams } from 'ionic-angular';
import * as _ from 'lodash';
import * as moment from 'moment';

import { Api } from '../../providers/api';
import { Usersettings } from '../../providers/usersettings';

import { Game } from '../pages';


@Component({
  selector: 'page-team-details',
  templateUrl: 'team-details.html',
})
export class TeamDetails {


  isFollowing = false;
  allGames: any[];
  dateFilter: string;
  useDateFilter = false;
  standings: any;
  games: any[];
  team: any;
  private tourneyData: any;

  constructor(
    private toastController: ToastController,
    private alertController: AlertController,
    private nav: NavController,
    private navParams: NavParams,
    private api: Api,
    private usettings: Usersettings) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TeamDetails');
    this.team = this.navParams.data;
    this.tourneyData = this.api.getCurrentTourney();

    console.log("ye meri team", this.team);

    console.log(this.tourneyData);

    this.games = _.chain(this.tourneyData.games)
      .filter(g =>
        g.team1Id === this.team.id ||
        g.team2Id === this.team.id
      )
      .map(g => {
        let isTeam1 = (g.team1Id === this.team.id);   // checking team1 or 2
        let oppoName = isTeam1 ? g.team2 : g.team1;   // whose opponent
        let score = this.getScore(isTeam1, g.team1Score, g.team2Score);
        return {
          gameId: g.id,
          oppo: oppoName,
          time: Date.parse(g.time),
          loc: g.location,
          locUrl: g.locationUrl,
          score: score,
          homeAway: (isTeam1 ? "vs." : "at")
        };
      })
      .value();

    console.log(this.games);

    this.allGames = this.games;
    this.standings = _.findLast(this.tourneyData.standings, { 'teamId': this.team.id });
    console.log("this: " + this.standings);

    this.isFollowing = this.usettings.isFav(this.team.id);
    
    //this.usettings.isFav(this.team.id).then(value => this.isFollowing = value);
  }

  getScore(isTeam1, team1Score, team2Score) {
    if (team1Score && team2Score) {
      var ApnaScore = (isTeam1 ? team1Score : team2Score);
      var oppoScore = (isTeam1 ? team2Score : team1Score);
      var winIndicator = ApnaScore > oppoScore ? "W: " : "L: ";
      return winIndicator + ApnaScore + " - " + oppoScore;
    } else {
      return "";
    }
  }

  gameClicked($event, game) {
    console.log('game clicked');

    let sourceGame = this.tourneyData.games.find(g => g.id === game.gameId);
    this.nav.parent.parent.push(Game, sourceGame); //source game is passed to game page
  }

  dateChanged() {
    if (this.useDateFilter) {
      this.games = _.filter(this.allGames, g => moment(g.time).isSame(this.dateFilter, 'day'));
    } else {
      this.games = this.allGames;
    }
  }

  getScoreWorL(game) {
    return game.score ? game.score[0] : '';
  }

  // getScoreColor(game) {
  //   return game.score.indexOf('W:') === 0 ? 'badge-primary' : 'badge-danger';
  //  return game.scoreDisplay.indexOf('W:') === 0 ? 'primary' : 'danger';
  // }


  toggleFollow() {
    if (this.isFollowing) {
      let confirm = this.alertController.create({
        title: 'Unfollow?',
        message: 'Are you sure you want to unfollow?',
        buttons: [
          {
            text: 'Yes',
            handler: () => {
              this.isFollowing = false;
              this.usettings.unfavTeam(this.team);

              let toast = this.toastController.create({
                message: 'You have unfollowed this team.',
                duration: 2000,
                position: 'bottom'
              });
              toast.present();
            }
          },
          { text: 'No' }
        ]
      });
      confirm.present();
    } else {
      this.isFollowing = true;
      let toast = this.toastController.create({
        message: 'You are now following this team.',
        duration: 2000,
        position: 'bottom'
      });
      toast.present();

      this.usettings.favTeam(
        this.team,
        this.tourneyData.tournament.id,
        this.tourneyData.tournament.name);

    }
  }

  refreshAll(refresher) {
    this.api.refreshCurrentTourney()
      .subscribe( () => {
        refresher.complete();
        this.ionViewDidLoad();
      }, error => {
        refresher.complete();
        console.log('errror');
      });
  }

  // click(){
  //   //this.nav.push(MyTeams);
  //   //this.nav.popToRoot();
  //   this.nav.parent.parent.popToRoot();
  //   console.log('Parent', this.nav.parent);

  // }
}
