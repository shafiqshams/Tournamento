import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { Api } from '../providers/api';
import { Usersettings} from '../providers/usersettings';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
import { MapPage, MyTeams, Tournaments, Teams, TeamDetails, Game, Standings, TeamHome } from '../pages/pages';
import { AgmCoreModule } from '@agm/core';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


@NgModule({
  declarations: [
    MyApp,
    MyTeams,
    Tournaments,
    Teams,
    TeamDetails,
    Game,
    Standings,
    TeamHome,
    MapPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HttpModule,
    AgmCoreModule.forRoot({ apiKey: 'AIzaSyCT1nlx5sjTVx-QH4QnDuFkfgiRLv5lToY' })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MyTeams,
    Tournaments,
    Teams,
    TeamDetails,
    Game,
    Standings,
    TeamHome,
    MapPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Api, Usersettings
  ]
})
export class AppModule {}
