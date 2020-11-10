import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PhasmophobiaComponent } from './game_modules/phasmophobia/phasmophobia.component';
import { TwitchComponent } from './game_modules/twitch/twitch.component';
import { ContactComponent } from './modules/contact/contact.component';

// Page Components
import { HomeComponent } from './modules/home/home.component';
import { ProjectsComponent } from './modules/projects/projects.component';
import { SandboxComponent } from './modules/sandbox/sandbox.component';

const routes: Routes = [
  { path: '', component: HomeComponent, data: { animation: 'home' } },
  { path: 'projects', component: ProjectsComponent, data: { animation: 'projects' } }, 
  { path: 'sandbox', component: SandboxComponent, data: { animation: 'sandbox' } }, 
  { path: 'contact', component: ContactComponent }, 

  // game_modules
  { path: 'phasmophobia', component: PhasmophobiaComponent }, 
  { path: 'twitch-api', component: TwitchComponent }, 
  
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
