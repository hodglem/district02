import { Component, Input, HostListener } from '@angular/core';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';


@Component({
    selector: 'app-desktop-header',
    templateUrl: './desktop-header.component.html',
    styleUrls: ['./desktop-header.component.css','../header.component.css']
})

export class DesktopHeaderComponent implements OnInit {
    @Input()
    headerImage;
    innerWidth = 0;
    isBig = false;

    ngOnInit() {
        this.innerWidth = window.innerWidth;
        this.setScreenSize();
    }

    @HostListener('window:resize', ['$event'])
    onresize(event) {
        this.innerWidth = window.innerWidth;
        this.setScreenSize();
    }


    setScreenSize() {
        this.isBig = this.innerWidth > 1199 ? true : false;
    }





}
