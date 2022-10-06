import { Component, OnInit } from '@angular/core';
import { LoggedInUserId } from './models/loggedInUserId.model';
import { User } from './models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit{

  user!: User;
  users: User[]=[];
  loggedInUser!: User | null;
  loggedInUserId!: LoggedInUserId | null;
  isConnected: boolean = false;

  constructor() { }

  ngOnInit(){
    if (sessionStorage.getItem('loggedInUserId')===null) {
      this.loggedInUserId = null;
    }
    else {
      this.loggedInUserId = JSON.parse(sessionStorage.getItem('loggedInUserId') || '{}');
    }

    if(this.loggedInUserId){
      this.isConnected = true;
    }
  }
}
