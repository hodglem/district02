import { Component, Input } from '@angular/core';


@Component({
    selector: 'app-desktop-header',
    templateUrl: './desktop-header.component.html',
    styleUrls: ['./desktop-header.component.css']
})

export class DesktopHeaderComponent {
    @Input()
    headerImage;


}
