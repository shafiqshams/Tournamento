import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs';
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the Api provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class Api {

  private baseUrl = 'https://scheduler-731be.firebaseio.com/';
  currentTourney: any = {};
  private tourneyData = {}; //used as a dictionary

  private offlineTournaments = {};

  constructor(public http: Http) {
    console.log('Hello Api Provider');
    
  }

  getTournaments() : Observable<any> {
    // return new Promise( resolve => {
    //   this.http.get(`${this.baseUrl}/tournaments.json`)
    //     .subscribe( response => {
    //         resolve( response.json() )
    //     }, error => {
    //         console.log("errrrr");
            
    //     });
    // });

    console.log("tournaments", Object.keys(this.offlineTournaments).length);
    console.log("tourdata", this.tourneyData);
    
    if (Object.keys(this.offlineTournaments).length) {
      console.log('**no HTTP call, just return the data'); 
      return Observable.of(this.offlineTournaments);
    }

    console.log('**about to make HTTP call for tournaments');
    return this.http.get(`${this.baseUrl}/tournaments.json`)
      .map( res => {
        this.offlineTournaments = res.json();
        return this.offlineTournaments;
      });

    
  }

  // getTournyDetails(tourneyId) : Observable<any> {
  //   return this.http.get(`${this.baseUrl}/tournaments-data/${tourneyId}.json`)
  //     .map( (res: Response) => {
  //       this.currentTourny = res.json();
  //       return this.currentTourny;
  //     });
  // }

  getTournamentData(tourneyId, forceRefresh: boolean = false) : Observable<any> {
        if (!forceRefresh && this.tourneyData[tourneyId]) {
            this.currentTourney = this.tourneyData[tourneyId];
            console.log('**no need to make HTTP call, just return the data'); 
            return Observable.of(this.currentTourney);
        }

        // don't have data yet
        console.log('**about to make HTTP call');
        return this.http.get(`${this.baseUrl}/tournaments-data/${tourneyId}.json`)
            .map(response => {
                this.tourneyData[tourneyId] = response.json();
                this.currentTourney = this.tourneyData[tourneyId];
                return this.currentTourney;
            });
    }


  getCurrentTourney() {
    return this.currentTourney;
  }

  refreshCurrentTourney() {
    return this.getTournamentData(this.currentTourney.tournament.id, true);
  }
}
 