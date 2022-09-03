import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    let btn : any = document.querySelector("#btn");
    let sidebar: any = document.querySelector(".sidebar");
    const liste = document.getElementById('liste');
  
      btn.onclick = function () {
        sidebar.classList.toggle("active");
      }
  }
}
