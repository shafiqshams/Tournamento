import { Injectable } from '@angular/core';
// import { Http } from '@angular/http';
// import 'rxjs/add/operator/map';
//import { Storage } from '@ionic/storage';
import { Events } from 'ionic-angular';
//import { SQLite } from 'ionic-native';
import * as _ from 'lodash';

@Injectable()
export class Usersettings {
  constructor(private events: Events) {
    console.log('Hello Usersettings Provider');
  }

  favTeam(team, tourId, tourName) {
    let item = {
      team: team,
      tournamentId: tourId,
      tournamentName: tourName
    };

    localStorage.setItem(team.id, JSON.stringify(item));
    this.events.publish('favs:changed');
    //this.storage.set(team.id.toString(), JSON.stringify(item));
  }

  unfavTeam(team) {

    localStorage.removeItem(team.id);
    this.events.publish('favs:changed');
    //this.storage.remove(team.id.toString());
  }

  isFav(teamId) {
    return localStorage.getItem(teamId) ? true : false;
    //return this.storage.get(teamId.toString()).then(value => value ? true : false); // working perfect
  }

  getAllFavorites() {

    var items = [];

    // localStorage.forEach((v,k) => {
    //   items.push(JSON.parse(v));
    // });

    _.forIn(window.localStorage, (v, k) => {
      items.push(JSON.parse(v));
    });

    console.log("items: ", items);
    console.log("length: ", items.length);

    return items.length ? items : null;
  }
}