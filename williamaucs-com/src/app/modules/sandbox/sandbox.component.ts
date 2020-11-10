import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

interface encryption_array {
  subtitle: String,
  input_control: FormControl,
  result: String,
  content: String
}

interface regristration_array {
  subtitle: string,
  input_control: FormGroup,
  button_name: string,
  funct: string,
  content: string,
  action_error: boolean,
  action_error_message: string,
}

@Component({
  selector: 'app-sandbox',
  templateUrl: './sandbox.component.html',
  styleUrls: ['./sandbox.component.css'], 
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

  public bcrypt_content: string = "<p>\
  bcrypt was previously my go-to password-hashing function. Although presented in 1999, \
  this hashing function remains secure to this day. This algorithm is unique because it is an adaptive function; \
  as computation power increases, the iteration count can be increased to resist brute-force search attacks. \
  Similar to Argon2, the content of the input above is sent to a VM, encrypted, then returned as an observable. \
  <br><br>To learn more about bcrypt and how it got its vast popularity, please visit their \
  <a href='https://en.wikipedia.org/wiki/Bcrypt' target='_blank'>Wikipedia.</a> To view their \
  Github and see how the algorithm works, please click \
  <a href='https://github.com/kelektiv/node.bcrypt.js/' target='_blank'>here.</a>\
  </p>";

  public scrypt_content: string = "<p>\
  I have used scrypt a few times for password-hashing, however \
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

  public register_content: string = "<p>\
  Registration is a must-know for any programmer in web development. \
  Unless the developer decides to only program static websites, user registration is key to making a \
  website dynamic. In this example, I have a simple form field which holds the user's input within a form group from Angular Forms. \
  When the user clicks <q>Register</q>, a light sanitation is done to ensure the minimum requirements are met. The \
  input is then sent as a POST request to the server, which then sanitizes the username further, encrypts the password, then \
  uses Mongoose to send the information to MongoDB. There are many other databases I could have chosen from, including a SQL relational \
  database, however the json format of the non-relational MongoDB suits this purpose very well.</p>";

  public login_content: string = "<p>\
  Many perceive the login process as simple compared to its registration counterpart, however I believe it requires \
  more attention. Similar to registration, a form group accepts the user input. It is then sent as a POST request to the \
  server, which sanitizes it, then checks to see if the username exists within the database and returns the result. If authentication \
  ended here, the login process would be considerably easier, however it is only the first step to authentication.</p>"

  // Initializing FormControls
  public userInput_argon2: FormControl = new FormControl('');
  public userInput_bcrypt: FormControl = new FormControl('');
  public userInput_scrypt: FormControl = new FormControl('');

  // Initializing user input variables
  public userInput_register: FormGroup = this.fb.group({
    username: ["", Validators.required],
    password: ["", Validators.required],
  });
  public userInput_login: FormGroup = this.fb.group({
    username: ["", Validators.required],
    password: ["", Validators.required],
  });

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

  // Registration array for *ngFor
  public registration: regristration_array[] = [
    {
      subtitle: "Registration",
      input_control: this.userInput_register,
      button_name: "Register",
      funct: "register",
      content: this.register_content,
      action_error: false,
      action_error_message: ""
    },
    {
      subtitle: "Login",
      input_control: this.userInput_login,
      button_name: "Login",
      funct: "login",
      content: this.login_content,
      action_error: false,
      action_error_message: ""
    }
  ]

  // FOR PRODUCTION PURPOSES ONLY
  // private _encryptUrl = "http://localhost:8080/api/encrypt";
  // private _registerUrl = "http://localhost:8080/api/register";
  // private _loginUrl = "http://localhost:8080/api/login";

  private _encryptUrl = "https://server.makosusa.com:8080/api/encrypt/";
  private _registerUrl = "https://server.makosusa.com:8080/api/register";
  private _loginUrl = "https://server.makosusa.com:8080/api/login";

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
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

  authenticateUser(process) {

    if (process == "register") {
      if (this.userInput_register.value.password != "") {
        if (/\s/.test(this.userInput_register.value.username)) {
          this.registration[0].action_error = true;
          this.registration[0].action_error_message = "Username must not contain whitespace"
          return;
        }
        this.http.post<{ response: string }>(this._registerUrl, this.userInput_register.value)
          .subscribe(
            res => {
              this.registration[0].action_error = true;
              this.registration[0].action_error_message = "Success!";
            },
            err => {
              console.error(err);
              if (err.error == "Username in use") {
                this.registration[0].action_error = true;
                this.registration[0].action_error_message = "Username already in use";
              }
            }
          )
      }
    }
    else if (process == "login") {
      if (this.userInput_login.value.password != "") {
        if (/\s/.test(this.userInput_login.value.username)) {
          this.registration[1].action_error = true;
          this.registration[1].action_error_message = "Username must not contain whitespace"
          return;
        }
        this.http.post<{ response: string }>(this._loginUrl, this.userInput_login.value)
          .subscribe(
            res => {
              this.registration[1].action_error = true;
              this.registration[1].action_error_message = "Success!";
            },
            err => {
              console.error(err);
              this.registration[1].action_error = true;
              if (err.error == "Account not found") {
                this.registration[1].action_error_message = "Account not found";
              }
              else {
                this.registration[1].action_error_message = "An error has occured";
              }
            }
          )
      }
    }
  }

}
