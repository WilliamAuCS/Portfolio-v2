import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }


  
  /* 
  Cookie API found at https://www.w3schools.com/js/js_cookies.asp
  */

  // Setting cookie in browser
  setCookie(cname, cvalue, exdays) {
    // Creating date object
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    // Creating cookie in browser
    // ** ADD ;secure;httpOnly when testing is complete **
    document.cookie = cname + "=" + cvalue + ";" + expires + ";secure;path=/";
  }

  // Cookie retreval
  getCookie(cname) {
    var name = cname + "=";
    // Creating array to hold cookie parts split off of ';'
    var ca = document.cookie.split(';');
    // Looping through array
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
}
