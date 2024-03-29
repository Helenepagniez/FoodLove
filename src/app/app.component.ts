import { Component, OnInit } from '@angular/core';
import { LoggedInUserId } from './core/interfaces/loggedInUserId';
import { User } from './core/interfaces/user';
import { PrimeNGConfig } from 'primeng-lts/api';

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

  constructor(private primengConfig: PrimeNGConfig) { }

  ngOnInit(){
    this.primengConfig.ripple = true;
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
