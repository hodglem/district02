import { Component, OnInit, ViewChild } from '@angular/core';
import { MeetingsService } from '../../d02-services/meetings-service';
import { Meetings } from '../../classes/meeting';
import { Options } from '../../classes/options';
import { MatSort, MatTableDataSource, MatPaginator } from '@angular/material';
import { DisplayedMeeting } from '../../classes/displayed-meeting';



@Component({
    selector: 'app-meetings',
    templateUrl: 'meetings.component.html',
    styleUrls: ['meetings.component.css', '../../app.component.css'],
})


export class MeetingsComponent implements OnInit {
    displayedColumns = ['city', 'day', 'time', 'name', 'location', 'address', 'type', 'map'];

    constructor() {

    }

    ngOnInit(): void {
    }


}



