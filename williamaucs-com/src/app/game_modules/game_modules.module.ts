import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeagueOfLegendsModule } from './league-of-legends/league-of-legends.module';
import { PhasmophobiaModule } from './phasmophobia/phasmophobia.module';
import { TwitchModule } from './twitch/twitch.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule, 
    LeagueOfLegendsModule, 
    PhasmophobiaModule, 
    TwitchModule, 
  ]
})
export class GameModulesModule { }
