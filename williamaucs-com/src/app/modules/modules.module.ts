import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeModule } from './home/home.module';
import { ProjectsModule } from './projects/projects.module';
import { SandboxModule } from './sandbox/sandbox.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule, 
    HomeModule,
    ProjectsModule, 
    SandboxModule,
  ]
})
export class ModulesModule { }
