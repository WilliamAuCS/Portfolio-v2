import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeModule } from './home/home.module';
import { ProjectsComponent } from './projects/projects.component';
import { ProjectsModule } from './projects/projects.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule, 
    HomeModule,
    ProjectsModule, 
  ]
})
export class ModulesModule { }
