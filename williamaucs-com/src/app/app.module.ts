import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { ContactComponent } from './modules/contact/contact.component';
import { ModulesModule } from './modules/modules.module';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { PlatformModule } from '@angular/cdk/platform';
import { LeagueOfLegendsComponent } from './game_modules/league-of-legends/league-of-legends.component';
import { GameModulesModule } from './game_modules/game_modules.module';

@NgModule({
  declarations: [
    AppComponent,
    ContactComponent,
  ],
  imports: [
    AppRoutingModule, 
    BrowserModule, 
    ModulesModule, 
    SharedModule, 
    BrowserAnimationsModule, 
    PlatformModule, 
    GameModulesModule, 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
