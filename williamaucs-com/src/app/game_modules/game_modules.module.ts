import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeagueOfLegendsModule } from './league-of-legends/league-of-legends.module';
import { PhasmophobiaModule } from './phasmophobia/phasmophobia.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule, 
    LeagueOfLegendsModule, 
    PhasmophobiaModule, 
  ]
})
export class GameModulesModule { }
