import { Component } from '@angular/core';
import { TeamHome } from '../pages';
import { LoadingController, NavController, NavParams, AlertController } from 'ionic-angular';
import { Api } from '../../providers/api';
import * as _ from 'lodash';

@Component({
  selector: 'page-teams',
  templateUrl: 'teams.html',
})
export class Teams {

  private allTeams: any;
  private allTeamDivisions: any;
  teams = [];
  queryText: string;

  // teams =[
  //   { id: 1, name: 'Team1'},
  //   { id: 2, name: 'Team2'},
  //   { id: 3, name: 'Team3'}  
  // ];

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private api: Api,
    private loadingController: LoadingController,
    private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Teams');
    let selectedTourney = this.navParams.data;
    
    let loader = this.loadingController.create({
      content: 'Please wait',
      spinner: 'bubbles'
    });
    loader.present().then( () => {
    this.api.getTournamentData(selectedTourney.id)
      .subscribe( data => {
        this.allTeams = data.teams; //It will be holding raw list of teams data
        console.log(this.allTeams);
        
        this.allTeamDivisions = _.chain(data.teams)
                                .groupBy('division')
                                .toPairs()
                                .map(item =>
                                _.zipObject(['divisionName', 'divisionTeams'], item))
                                .value();
        
        //this.teams = data.teams;
        console.log(this.allTeamDivisions);
        
        this.teams = this.allTeamDivisions;

        loader.dismiss();

      }, error => {
      loader.dismiss();
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


  tapped($event, team) {
    this.navCtrl.push(TeamHome, team);
  }

  updateTeams(){
    let queryTextLower = this.queryText.toLowerCase();
    let filteredTeams = [];
    _.forEach(this.allTeamDivisions, td => {
      let teams = _.filter(td.divisionTeams, t => (<any>t).name.toLowerCase().includes(queryTextLower));
      if (teams.length) {
        filteredTeams.push({ divisionName: td.divisionName, divisionTeams: teams });
      }
    });

    this.teams = filteredTeams;
  }

  goHome(){
    //this.navCtrl.push(MyTeams);
    this.navCtrl.popToRoot();

  }
}
