import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhasmophobiaComponent } from './phasmophobia.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatCardModule} from '@angular/material/card'; 
import {MatCheckboxModule} from '@angular/material/checkbox'; 
import {MatButtonModule} from '@angular/material/button'; 


@NgModule({
  declarations: [PhasmophobiaComponent],
  imports: [
    CommonModule, 
    MatTabsModule, 
    MatCardModule, 
    MatCheckboxModule, 
    MatButtonModule, 
  ]
})
export class PhasmophobiaModule { }
