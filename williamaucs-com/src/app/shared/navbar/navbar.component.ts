import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  private current_url: string = "";
  constructor(private _router: Router) { }

  ngOnInit(): void {
    this.current_url = window.location.href.split('/')[3];
    console.log(this.current_url);

    // Easter Egg? hmm..
    if(this.current_url === "phasmophobia") {
      document.getElementById('nav-desktop').style.backgroundImage = "url('/assets/phasmophobia/phasmo_toolbar.jpg')";
      document.getElementById('nav-desktop').style.backgroundRepeat = "no-repeat";
      document.getElementById('nav-desktop').style.backgroundPosition = "center";
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
