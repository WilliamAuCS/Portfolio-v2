import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SandboxComponent } from './sandbox.component';
import { MatCardModule } from '@angular/material/card';


@NgModule({
  declarations: [SandboxComponent],
  imports: [
    CommonModule, 
    MatCardModule, 
  ]
})
export class SandboxModule { }
