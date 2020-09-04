import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarModule } from './navbar/navbar.module';
import { AppRoutingModule } from '../app-routing.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule, 
    NavbarModule, 
    AppRoutingModule,
  ], 
  exports: [
    NavbarModule, 
    AppRoutingModule, 
  ]
})
export class SharedModule { }
