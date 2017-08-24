import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TeamDetails } from './team-details';

@NgModule({
  declarations: [
    TeamDetails,
  ],
  imports: [
    IonicPageModule.forChild(TeamDetails),
  ],
})
export class TeamDetailsModule {}
