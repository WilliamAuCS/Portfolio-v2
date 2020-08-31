import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ContactComponent } from './modules/contact/contact.component';
import { AboutComponent } from './modules/about/about.component';
import { SandboxComponent } from './modules/sandbox/sandbox.component';
import { ModulesModule } from './modules/modules.module';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    ContactComponent,
    AboutComponent,
    SandboxComponent,
  ],
  imports: [
    AppRoutingModule, 
    BrowserModule, 
    ModulesModule, 
    SharedModule, 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
