import { Component, OnInit } from '@angular/core';



@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
    headerImage = './assets/triangle.png';
    innerHeight = 0;
    innerWidth = 0;
    isMobile = false;

    ngOnInit(): void {
        this.innerHeight = (window.screen.height);
        this.innerWidth = (window.screen.width);

        if (innerWidth < 700) {
            this.isMobile = true;
        } else {
            this.isMobile = false;
        }
    }


}
