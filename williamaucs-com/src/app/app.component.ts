import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { slider } from './route-animations';
import { Platform } from '@angular/cdk/platform';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'], 
  animations: [slider]
})
export class AppComponent {
  title = 'williamaucs-com';

  constructor(public platform: Platform) {
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}
