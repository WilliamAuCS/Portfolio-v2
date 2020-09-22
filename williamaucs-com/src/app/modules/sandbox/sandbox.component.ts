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
  Argon2 is one of my favorite password hashing functions. It designed to have a high memory filling\
  rate, while also being effective against tradeoff attacks (ex. cache and memory\
  organization exploitation). This example takes the input above and sends the data \
  over https to a VM over hosted by GCP. My server (Node.js) accepts this data, encrypts \
  it and uses a callback function to return it to the front-end as an observable. The response \
  is then displayed back to the user using *ngFor through an object. <br><br>\
  To learn more about Argon2 and its varients, please visit their\
  <a href='https://en.wikipedia.org/wiki/Argon2' target='_blank'>Wikipedia.</a>\
  To view their Github and see how the algorithm works, please click\
  <a href='https://github.com/P-H-C/phc-winner-argon2' target='_blank'>here.</a>\
  </p>";

  public bcrypt_content: string = "bcrypt was previously my go-to password-hashing function. Although presented in 1999, \
  this hashing function remains secure to this day. This algorithm is unique because it is an adaptive function; \
  as computation power increases, the iteration count can be increased to resist brute-force search attacks. \
  Similar to Argon2, the content of the input above is sent to a VM, encrypted, then returned as an observable. \
  <br><br>To learn more about bcrypt and how it got its vast popularity, please visit their \
  <a href='https://en.wikipedia.org/wiki/Bcrypt' target='_blank'>Wikipedia.</a> To view their \
  Github and see how the algorithm works, please click \
  <a href='https://github.com/kelektiv/node.bcrypt.js/' target='_blank'>here.</a>\
  </p>";

  public scrypt_content: string = "I have used scrypt a few times for password-hashing, however \
  its <q>predecessor</q>, bcrypt, was always preferable. scrypt was created specifically \
  to ensure large-scale custom hardware attacks were costly \
  to attackers, requiring a large amount of memory. In my experience, I preferred bcrypt because of \
  its known reliability. scrypt has claimed to be <q>better</q> than bcrypt, however because of its newness \
  it has also received less scrutiny. <br><br>\
  To learn more about the efficiency and <q>upgrades</q> scrypt has over its predecessor bcrypt, \
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
