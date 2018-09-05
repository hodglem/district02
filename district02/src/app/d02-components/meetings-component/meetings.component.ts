import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

import { DataSource } from '@angular/cdk/table';
import { MeetingsService } from '../../d02-services/meetings-service';
import { Meetings } from '../../classes/meeting';



@Component({
    selector: 'app-meetings',
    templateUrl: 'meetings.component.html',
    styleUrls: ['meetings.component.css', '../../app.component.css'],
})


export class MeetingsComponent implements OnInit {

    title = 'Fox Valley Tech Web Meeting';
    lat = 44.2833555;
    lon = -88.4612167;

    displayedColumns = ['city'];
    dataSource: Meetings[] = [];

    constructor(private meetingsService: MeetingsService) {

    }

    ngOnInit(): void {
        // this.meetingsService.getMeetings().subscribe(value => alert('OK'));
        this.meetingsService.getMeetings().subscribe(typedMeetings => this.dataSource = typedMeetings);

    }
}
export interface Element {
    name: string;
    position: number;
    weight: number;
    symbol: string;
}



// const model1: MeetingModel = new MeetingModel();
// const model2: MeetingModel = new MeetingModel();
// const meetings = [];
// model1.city = 'Appleton';
// model1.day = 'Mon';
// model1.time = '10:00 AM';
// model1.meetingName = 'Design For Living Group';
// model1.location = 'First United Methodist Church',
//     model1.address = '325 E Franklin St - Lower Level - Room B101';
// model1.type = 'Closed/NS';
// model1.longitude = -88.40167989999998;
// model1.latitiude = 44.2636251;

// model2.city = 'Appleton';
// model2.day = 'Mon';
// model2.time = '7:00 PM';
// model2.meetingName = 'Inspiration';
// model2.location = 'Casa Clare Treatment Facility';
// model2.address = '201 S Glenridge Ct';
// model2.type = 'Closed/WO/NS';
// model2.longitude = -88.46427019999999;
// model2.latitiude = 44.260152;

// meetings.push(model1);
// meetings.push(model2);


