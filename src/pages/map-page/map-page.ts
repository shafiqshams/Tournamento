import { Component } from '@angular/core';
import { NavParams, NavController } from 'ionic-angular';
import { Api } from '../../providers/api';
declare var window: any;

@Component({
  selector: 'page-map-page',
  templateUrl: 'map-page.html',
})
export class MapPage {

  map: any = {};

  constructor(public navParams: NavParams, private navCtrl: NavController, public api: Api) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapPage');
    let games = this.navParams.data;
    let tourneyData = this.api.getCurrentTourney();
    let location = tourneyData.locations[games.locationId];
    
    this.map = {
      lat: location.latitude,
      lng: location.longitude,
      zoom: 12,
      markerLabel: games.location 
    };
    console.log(this.map);
  }

  getDirections(){
    window.location = `geo:${this.map.lat},${this.map.lng};u=35`; 
  }

    goHome(){
    //this.navCtrl.push(MyTeams);
    this.navCtrl.popToRoot();

  }
  


}
