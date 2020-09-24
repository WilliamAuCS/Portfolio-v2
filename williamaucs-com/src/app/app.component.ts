import { Component, HostListener , OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { on } from 'process';
import { slider } from './route-animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'], 
  animations: [slider]
})
export class AppComponent {
  title = 'williamaucs-com';

  private innerWidth: any;
  public is_mobile: boolean = false;

  
  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
    console.log(this.innerWidth)
    this.check_if_mobile(this.innerWidth)
  }

  @HostListener('window:resize', ['$event'])
  onResize(event){
    this.innerWidth = window.innerWidth;
    this.check_if_mobile(this.innerWidth)
  }

  check_if_mobile(width) {
    if(width < 500) {
      console.log("mobile")
      this.is_mobile = true;
    }
    else {
      console.log("not mobile")
      this.is_mobile = false;
    }
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}
