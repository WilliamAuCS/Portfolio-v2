import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { MatIconModule } from '@angular/material/icon'; 
import { MatSidenavModule } from '@angular/material/sidenav'; 
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button'; 


@NgModule({
  declarations: [NavbarComponent],
  imports: [
    CommonModule, 
    AppRoutingModule,
    MatIconModule, 
    MatSidenavModule, 
    MatToolbarModule,
    MatButtonModule,  
  ], 
  exports: [NavbarComponent]
})
export class NavbarModule { }
