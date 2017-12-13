import { Component } from '@angular/core';



@Component({
    selector: 'app-meetings',
    templateUrl: 'meetings.component.html',
    styleUrls: ['meetings.component.css'],
})


export class MeetingsComponent {
    title = 'Fox Valley Tech Web Meeting';
    lat = 44.2833555;
    lon = -88.4612167;
}
