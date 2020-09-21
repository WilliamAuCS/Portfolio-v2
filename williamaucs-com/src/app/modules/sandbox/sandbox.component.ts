import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

interface encryption_array {
  subtitle: String,
  input_control: FormControl,
  result: String,
  content: String
}

@Component({
  selector: 'app-sandbox',
  templateUrl: './sandbox.component.html',
  styleUrls: ['./sandbox.component.css']
})
export class SandboxComponent implements OnInit {

  public argon2_content: string = "<p>\
  Argon2 is a password hashing function designed to have a high memory filling\
  rate, while also being effective against tradeoff attacks (ex. cache and memory\
  organization exploitation). This password hashing function was the winner of the \
  <a href='https://en.wikipedia.org/wiki/Password_Hashing_Competition' target='_blank'>\
  Password Hashing Competition</a>\
  in July 2015. To learn more about Argon2 and its varients, please visit their\
  <a href='https://en.wikipedia.org/wiki/Argon2' target='_blank'>Wikipedia</a>\
  To view their Github and see how the algorithm works, please click\
  <a href='https://github.com/P-H-C/phc-winner-argon2' target='_blank'>here.</a>\
  </p>";

  public bcrypt_content: string = "bcrypt, a password-hashing function presented at USENIX in 1999, \
  was based on the commonly known Blowfish cipher. This hashing function incorperates a salt, preventing\
  against <a href='https://en.wikipedia.org/wiki/Rainbow_table' target='_blank'>rainbow table</a> attacks, \
  as well as options to slow down the function to resist brute-force search attacks. bcrypt is the \
  default password hashing algorithm for OpenBSD as well as other systems including Linux. \
  To learn more about bcrypt and how it got its vast popularity, please visit their \
  <a href='https://en.wikipedia.org/wiki/Bcrypt' target='_blank'>Wikipedia.</a> To view their \
  Github and see how the algorithm works, please click \
  <a href='https://github.com/kelektiv/node.bcrypt.js/' target='_blank'>here.</a>\
  </p>";

  public scrypt_content: string = "scrypt is a password-based key derivation function created \
  for <a href='https://en.wikipedia.org/wiki/Tarsnap' target='_blank'>Tarsnap</a> backup service. \
  This algorithm was specifically created to ensure large-scale custom hardware attacks were costly \
  to the attackers, requiring them to use large amounds of memory. This function was published by \
  <a href='https://en.wikipedia.org/wiki/Internet_Engineering_Task_Force' target='_blank'>IETF</a> \
  in 2016. To learn more about the efficiency and <q>upgrades</q> scrypt has over its predecessor bcrypt, \
  please visit their <a href='https://en.wikipedia.org/wiki/Scrypt' target='_blank'>Wikipedia.</a> \
  To view their Github and see how the algorithm works, please click \
  <a href='https://github.com/barrysteyn/node-scrypt' target='_blank'> here.</a>\
  </p>"

  // Initializing FormControls
  public userInput_argon2: FormControl = new FormControl('');
  public userInput_bcrypt: FormControl = new FormControl('');
  public userInput_scrypt: FormControl = new FormControl('');

  // Encryption array for *ngFor
  public encryption: encryption_array[] = [
    {
      subtitle: "Argon2i",
      input_control: this.userInput_argon2,
      result: "",
      content: this.argon2_content
    },
    {
      subtitle: "bcrypt",
      input_control: this.userInput_bcrypt,
      result: "",
      content: this.bcrypt_content
    },
    {
      subtitle: "scrypt",
      input_control: this.userInput_scrypt,
      result: "",
      content: this.scrypt_content
    }
  ]


  // private _encryptUrl = "http://localhost:8080/api/encrypt/";
  private _encryptUrl = "https://server.makosusa.com:8080/api/encrypt/";

  constructor(
    private http: HttpClient,
  ) { }

  ngOnInit(): void {

  }

  // Change to just "encrypt() with type in parameter. Then send to server to figure out type"
  encrypt(encrypt_type) {
    if (encrypt_type == "Argon2i") {
      this.http.post<{ result: string }>(this._encryptUrl + encrypt_type, { text: this.userInput_argon2.value })
        .subscribe(
          res => {
            this.encryption[0].result = res.result;
          },
          err => {
            console.error(err);
            this.encryption[0].result = "An error has occured";
          }
        )
    }
    else if (encrypt_type == "bcrypt") {
      this.http.post<{ result: string }>(this._encryptUrl + encrypt_type, { text: this.userInput_bcrypt.value })
        .subscribe(
          res => {
            this.encryption[1].result = res.result;
          },
          err => {
            console.error(err);
            this.encryption[1].result = "An error has occured";
          }
        )
    }
    else if (encrypt_type == "scrypt") {
      this.http.post<{ result: string }>(this._encryptUrl + encrypt_type, { text: this.userInput_scrypt.value })
        .subscribe(
          res => {
            this.encryption[2].result = res.result;
          }, 
          err => {
            console.error(err);
            this.encryption[2].result = "An error has occured";
          }
      )
    }

  }

}
