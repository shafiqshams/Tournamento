import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Game } from './game';

@NgModule({
  declarations: [
    Game,
  ],
  imports: [
    IonicPageModule.forChild(Game),
  ],
})
export class GameModule {}
