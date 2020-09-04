import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Page Components
import { HomeComponent } from './modules/home/home.component';
import { ProjectsComponent } from './modules/projects/projects.component';
import { SandboxComponent } from './modules/sandbox/sandbox.component';

const routes: Routes = [
  { path: '', component: HomeComponent, data: { animation: 'home' } },
  { path: 'projects', component: ProjectsComponent, data: { animation: 'projects' } }, 
  { path: 'sandbox', component: SandboxComponent, data: { animation: 'sandbox' } }, 

]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
