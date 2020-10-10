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

  private cookieMessage: string = "This site uses cookies to ensure you receive the best possible experience on my website.\
  Cookies will usually only be used when demonstraiting software for your convenience.";
  private cookieDismiss: string = "Got it!";
  private cookieLinkText: string = "Learn more";

  ngOnInit() {
    let cc = window as any;
    cc.cookieconsent.initialise({
      type: 'info',
      position: 'bottom',
      palette: {
        popup: {
          background: "#164969"
        },
        button: {
          background: "#ffe000",
          text: "#164969"
        }
      },
      theme: "classic",
      content: {
        message: this.cookieMessage,
        dismiss: this.cookieDismiss,
        link: this.cookieLinkText,
      }
    });
  }
}
