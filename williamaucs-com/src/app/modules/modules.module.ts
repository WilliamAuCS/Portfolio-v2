import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeModule } from './home/home.module';
import { ProjectsComponent } from './projects/projects.component';



@NgModule({
  declarations: [ProjectsComponent],
  imports: [
    CommonModule, 
    HomeModule,
  ]
})
export class ModulesModule { }
