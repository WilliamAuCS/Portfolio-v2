import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-sandbox',
  templateUrl: './sandbox.component.html',
  styleUrls: ['./sandbox.component.css']
})
export class SandboxComponent implements OnInit {

  public userInput_argon2: FormControl;
  public toArgonResult: String;

  private _toArgonUrl = "http://localhost:8080/api/toArgon";

  constructor(
    private http: HttpClient, 
  ) { }

  ngOnInit(): void {
    this.userInput_argon2 = new FormControl('');
  }

  encryptToArgon() {
    console.log(this.userInput_argon2.value)
    this.http.post<{ result: string }>(this._toArgonUrl, {text: this.userInput_argon2.value})
    .subscribe(
      res => { this.toArgonResult = res.result; },
      err => 
      { 
        console.error(err);
        this.toArgonResult = "An error has occured";
      }
    )
  }

}
