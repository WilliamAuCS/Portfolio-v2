import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/authentication/auth.service';
import ghost_information from './ghost_information.json';


@Component({
  selector: 'app-phasmophobia',
  templateUrl: './phasmophobia.component.html',
  styleUrls: ['./phasmophobia.component.css']
})
export class PhasmophobiaComponent implements OnInit {

  public user_agreement: boolean = false;
  public ghost_list = [];
  public ghost_possibilities = [];
  private evidence = {
    "EMF Level 5": false,
    "Spirit Box": false,
    "Freezing Temperatures": false,
    "Fingerprints": false,
    "Ghost Orb": false,
    "Ghost Writing": false,
  }
  private checked_count: number = 0;
  public evidence_keys = [];
  private checked_evidence = [];
  private similar_evicence = {
    "EMF Level 5": 6,
    "Spirit Box": 7,
    "Freezing Temperatures": 6,
    "Fingerprints": 5,
    "Ghost Orb": 6,
    "Ghost Writing": 6
  };
  public similar_evidence_copy = Object.assign({}, this.similar_evicence);
  public checked = false;


  constructor(private _auth: AuthService) {
  }

  ngOnInit(): void {
    // Placing ghost types into array
    for (var x in ghost_information) {
      ghost_information.hasOwnProperty(x) && this.ghost_list.push(ghost_information[x]);
    }
    this.ghost_possibilities = Array.from(this.ghost_list);
    // Converting evidence into key array for *ngFor
    for (var ev in this.evidence) {
      if (this.evidence.hasOwnProperty(ev)) {
        this.evidence_keys.push(ev);
      }
    }
    // Setting user_agreement based on cookie
    this.user_agreement = !!this._auth.getCookie("phasmophobia agreement");
  }

  // Ensures the user agrees with viewing the content
  agreement() {
    this.user_agreement = true;
    this._auth.setCookie("phasmophobia agreement", this.user_agreement, 365);
  }

  // Checks if evidence has been checked or not and changes it respectively
  toggleCheck(evidence_name) {
    let tr;
    // Swap boolean
    this.evidence[evidence_name] = !this.evidence[evidence_name];
    // If it is now true, push it to checked_evidence array
    if (this.evidence[evidence_name] == true) {
      this.checked_evidence.push(evidence_name);
      this.checked_count++;
      tr = true;
    }
    // If it is now false, remove from checked_evidence array
    else {
      this.checked_count--;
      for (let index = 0; index < this.checked_evidence.length; index++) {
        if (this.checked_evidence[index] === evidence_name) {
          this.checked_evidence.splice(index, 1);
          tr = false;
          break;
        }
      }
    }
    this.calculatePossibilities(tr);
  }

  // Calculates which ghosts match the corresponding evidence
  calculatePossibilities(tr) {
    if (this.checked_count <= 3) {
      // If false, reset ghost_possibilities
      if (tr == false) {
        this.ghost_possibilities = Array.from(this.ghost_list);
        this.similar_evidence_copy = Object.assign({}, this.similar_evicence);
      }
      // To remove
      let to_remove = [];
      // console.log(this.ghost_possibilities.length)
      // console.log(this.ghost_list)
      for (let index = 0; index < this.ghost_possibilities.length; index++) {
        for (let j = 0; j < this.checked_evidence.length; j++) {
          // If element in ghost_possibilities does NOT have one of the evidence, set to remove
          if (this.ghost_possibilities[index].evidence.includes(this.checked_evidence[j]) == false) {
            to_remove.push(index);
            break;
          }
        }
      }
      // Removing from ghost_possibilities array
      for (let index = 0; index < to_remove.length; index++) {
        // Avoids duplicates in to_remove array
        if (index > 0 && to_remove[index] === to_remove[index - 1]) {
          continue;
        }
        // Removing evidence from similar_evidence_copy
        for (let j = 0; j < 3; j++) {
          this.similar_evidence_copy[this.ghost_possibilities[to_remove[index] - index].evidence[j]]--;
        }
        this.ghost_possibilities.splice(to_remove[index] - index, 1);
      }
    }
  }
}
