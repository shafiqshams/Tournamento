import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Standings } from './standings';

@NgModule({
  declarations: [
    Standings,
  ],
  imports: [
    IonicPageModule.forChild(Standings),
  ],
})
export class StandingsModule {}
