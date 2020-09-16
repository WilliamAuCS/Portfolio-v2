import { Component, OnInit } from '@angular/core';
import * as AOS from 'aos';


@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  project_description = {
    makosusa: "MakosUSA is a website created to display various projects, primarly leather craft. \
    The front-end of this website is created using Angular 9, many components utilizing Angular Materials. \
    This website also utilizes a back-end server built on Node.js with the Express framework. \
    The back-end handles user accout registration, sign in, token assignment and confirmation using JWT and cookies, and \
    displaying certain protected content. User information is stored in MongoDB for quick and easy write and retreval.", 
    
    williamaucs: "My portfolio website (the website you are currently viewing) was created using Angular 9 \
    for its front-end. Bootstrap 4 and Angular Materials are also used for various formatting and appearence \
    changes. This website also contains a Node.js back-end, displayed in the Sandbox page. This back-end's purpose \
    is to display various tools for you to see firsthand. For example, one component allows a user to input a string. The user \
    can then choose which encryption type to use from the list, and the encrypted result will be displayed. New components \
    will be created and displayed regularly, including simple tutorials.", 

    williamaucs_legacy: "This website was my first time experiencing front-end development. I created this website using the \
    JavaScript React library. Creating this website was a challenge at first; as it was my first time programming \
    in the front-end, however the concept quickly became familiar. This website was my original portfolio website, however \
    as I gained experience in front-end developemnt, I decided to recreate my entire portfolio website into what you are \
    viewing now.", 

    sql_database: "This project was completed for my 332 Database course. It was my first time creating a database, and \
    really sparked my interest in the field. I was in a team with two other students, drawing out diagrams to visualize the \
    structure of the database, and using PuTTY to SSL into our college's servers to create the database.", 

    cube_runner: "Cube Runner was my first Unity project in game development. Initially, I used many tutorials learning how to \
    utilize the Unity rigid body system and implimenting physics. The game is playable with multiple complete levels, challenging even \
    the best players.",

    mysteria: "This project was my first major game created using the Unity Engine. This game is an RPG style, tile based game allowing \
    the player to make decisions that will help progress the storyline, as well as make NPC friends. I have temporarly paused \
    development of this game, however playing and creating indie RPG games have always been my passion and I definetly intend on \
    resuming development in the future.",

    pong: "Pong was my first game created using Python. The game comes integrated with sounds, collisions, and a fully functioning \
    scoreboard with its own unique win/loss sounds. Unlike classic Pong, this game has no walls, forcing players to pay attention to \
    vertical dynamics as well.", 

    alien_invasion: "Alien Invasion, similar to my Pong game was created using Python. Many online resources were utilized in the creation \
    of this game, allowing me to grasp new and more intermediate concepts. This game is more complicated, having multiple moving AI's \
    constantly moving to defeat the player, as well as a fully functioning scoreboard.", 
  }

  constructor() { }

  ngOnInit(): void {
    AOS.init({
      duration: 1200
    });
  }

}
