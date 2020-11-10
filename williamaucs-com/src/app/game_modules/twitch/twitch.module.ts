import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TwitchComponent } from './twitch.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input'; 
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [TwitchComponent],
  imports: [
    CommonModule, 
    MatCardModule, 
    MatFormFieldModule, 
    ReactiveFormsModule, 
    MatInputModule, 
    MatButtonModule, 
  ]
})
export class TwitchModule { }
