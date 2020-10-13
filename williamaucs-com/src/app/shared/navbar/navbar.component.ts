import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  private current_url: string = "";
  private isTabletScreen;

  constructor(private _router: Router, 
    private _breakpointObserver: BreakpointObserver) { }

  ngOnInit(): void {
    this.current_url = window.location.href.split('/')[3];
    this.isTabletScreen = this._breakpointObserver.isMatched('(max-width: 1000px');

    // Easter Egg? hmm..
    if(this.current_url === "phasmophobia") {
      document.getElementById('nav-desktop').style.backgroundImage = "url('/assets/phasmophobia/phasmo_toolbar.jpg')";
      document.getElementById('nav-desktop').style.backgroundRepeat = "no-repeat";
      document.getElementById('nav-desktop').style.backgroundPosition = "center";
      if(this.isTabletScreen) {
        document.getElementById('nav-desktop').style.backgroundSize = "cover";
      }
    }
  }

  checkToReload(url) {
    if(this.current_url === "phasmophobia") {
      this._router.navigate([url]).then(() => {
        window.location.reload();
      });
    }
  }

}
