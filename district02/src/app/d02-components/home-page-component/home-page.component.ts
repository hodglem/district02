import { Component, Input } from '@angular/core';
import { MeetingsService } from '../../d02-services/meetings-service';

@Component({
    selector: 'app-home',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.css', '../../app.component.css']
})
export class HomePageComponent {
    @Input()
    headerImage;

    constructor (private meetingsService : MeetingsService){

    }

    public getMeetings(){
        this.meetingsService.getMeetings().subscribe();
    }

}

