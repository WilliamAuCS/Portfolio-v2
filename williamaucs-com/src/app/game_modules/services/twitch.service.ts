import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TwitchService {

  // private get_stream_info: string = 'https://server.makosusa.com:8080/api/twitch/getUser?';
  private get_stream_info: string = 'http://localhost:8080/api/twitch/getUser/';

  constructor(private _http: HttpClient) { }

  get_user_info(user: string) {
    return this._http.get<{ data: JSON }>(this.get_stream_info + user);
  }
}