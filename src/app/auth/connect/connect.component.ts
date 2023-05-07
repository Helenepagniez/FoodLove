import { Component } from "@angular/core";

@Component({
    selector: 'app-connect',
    templateUrl: './connect.component.html',
    styleUrls: ['./connect.component.css']
})
export class ConnectComponent {
    vueLogin: boolean = true;

    changeVue() {
        if (this.vueLogin) {
            this.vueLogin = false;
        }
        else {
            this.vueLogin = true;
        }
    }
}