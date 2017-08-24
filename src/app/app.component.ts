import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, LoadingController, Events, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Usersettings } from '../providers/usersettings';
import { Api } from '../providers/api';
import { MyTeams, Tournaments, TeamHome } from '../pages/pages';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = MyTeams;
  favTeams: any = [];
  //pages: Array<{title: string, component: any}>;

  constructor(
    private usettings: Usersettings,
    private api: Api,
    private loadingController: LoadingController,
    private events: Events,
    public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,
    private alertCtrl: AlertController) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    // this.pages = [
    //   { title: 'Home', component: HomePage },
    //   { title: 'List', component: ListPage }
    // ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.refreshfavs();
      this.events.subscribe('favs:changed', () => this.refreshfavs());
    });
  }

  // openPage(page) {
  //   // Reset the content nav to have just this page
  //   // we wouldn't want the back button to show in this scenario
  //   this.nav.setRoot(page.component);
  // }

  goToTeam(fav) {
    let loader = this.loadingController.create({
      content: 'Getting data...',
      spinner: 'bubbles',
      dismissOnPageChange: true
    });
    loader.present();
    console.log("favs", fav);

    this.api.getTournamentData(fav.tournamentId)
      .subscribe(t => {
        this.nav.push(TeamHome, fav.team);
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

  refreshfavs() {
    this.favTeams = this.usettings.getAllFavorites();
  }
  goToTourny() {
    this.nav.push(Tournaments);
  }

  goHome() {
    //    this.nav.push(MyTeams);
    this.nav.popToRoot();
  }
}
