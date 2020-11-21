import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TwitchService } from '../services/twitch.service';

interface twitch_input_array {
  title: String,
  input_control: FormControl,
  input_question: String,
  result: string[],
  img_url: string, 
  closest_match: boolean, 
  content: String,
  error: boolean
}

@Component({
  selector: 'app-twitch',
  templateUrl: './twitch.component.html',
  styleUrls: ['./twitch.component.css']
})

export class TwitchComponent implements OnInit {

  // Initializing contents
  private twitch_input_content = "This function uses the Twitch API to recieve\
  information of the provided user.";

  // Initializing FormControls
  public userInput_GetInformation: FormControl = new FormControl('');

  // twitch_input for *ngFor
  public twitch_input: twitch_input_array[] = [
    {
      title: "Streamer Information",
      input_control: this.userInput_GetInformation,
      input_question: "Username",
      result: null,
      img_url: null, 
      closest_match: false, 
      content: this.twitch_input_content,
      error: false
    }
  ];

  constructor(
    private _twitch: TwitchService, 
    ) {}

  ngOnInit(): void {
  }

  findUser() {
    this._twitch.get_user_info(this.userInput_GetInformation.value)
      .subscribe(
        res => {
          this.twitch_input[0].error = false;
          
          this.twitch_input[0].img_url = res.data['thumbnail_url'];
          // Breaking JSON into HTML friendly string
          let twitch_output = JSON.stringify(res.data);
          twitch_output = twitch_output.slice(1, twitch_output.length - 1);
          this.twitch_input[0].result = twitch_output.split(',');

          // Checking if returned user matches requested user. If not, it is top suggested
          if(res.data['display_name'] != this.userInput_GetInformation.value.toLowerCase()) {
            this.twitch_input[0].closest_match = true;
          }
          else {
            this.twitch_input[0].closest_match = false;
          }
        },
        err => {
          console.error(err);
          this.twitch_input[0].error = true;
        }
      )
  }
  
}
