import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import * as _ from 'lodash';
import { Api } from '../../providers/api';

@Component({
  selector: 'page-standings',
  templateUrl: 'standings.html',
})
export class Standings {

  allStandings: any[];
  standings: any[];
  team: any;
  divisionFilter = 'division';

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private api: Api) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Standings');
    this.team = this.navParams.data;
    let tourneyData = this.api.getCurrentTourney();
    this.standings = tourneyData.standings;

    // this.allStandings =
    //   _.chain(this.standings)
    //    .groupBy('division')
    //    .toPairs()
    //    .map(item => _.zipObject(['divisionName', 'divisionStandings'], item))
    //    .value();

    console.log('standings:', this.standings);
    //console.log('division Standings', this.allStandings);
    this.allStandings = tourneyData.standings;
    this.filterDivision();
  }

  myHeaderFn(record, recordIndex, records) {
    if (recordIndex === 0 || record.division !== records[recordIndex - 1].division) {
      return record.division;
    }
    return null;
  }

  filterDivision() {
    if (this.divisionFilter === 'all') {
      this.standings = this.allStandings;
    } else {
      this.standings = _.filter(this.allStandings, s => s.division === this.team.division);
      console.log("Filtered standings: ", this.standings);
    }

  }
}
