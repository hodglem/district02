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
    dataSource: MatTableDataSource<DisplayedMeeting>;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    constructor(private meetingsService: MeetingsService) {

    }

    ngOnInit(): void {
        // TODO Refactor this to use a resolver
        this.meetingsService.getMeetings().subscribe(typedMeetings => {
            this.dataSource = new MatTableDataSource(this.buildDisplayedMeetings(typedMeetings));
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
        }
        );

    }

    private buildDisplayedMeetings(typedMeetings: Meetings[]): DisplayedMeeting[] {
        const displayedMeetings: DisplayedMeeting[] = [];

        typedMeetings.forEach(meeting => {
            const displayedMeeting = new DisplayedMeeting();
            displayedMeeting.id = meeting.id;
            displayedMeeting.city = meeting.meetingLocation.city.name;
            displayedMeeting.day = this.getDayOfTheWeek(meeting.meetingOccur.day);
            displayedMeeting.startTime = meeting.meetingOccur.startTime;
            displayedMeeting.name = meeting.name;
            displayedMeeting.location = meeting.meetingLocation.name;
            displayedMeeting.address = meeting.meetingLocation.address;
            displayedMeeting.type = this.getDisplayedTypes(meeting.optionses);
            displayedMeeting.lat = meeting.meetingLocation.lat;
            displayedMeeting.lon = meeting.meetingLocation.lon;
            displayedMeetings.push(displayedMeeting);
        });

        return displayedMeetings;
    }

    getDayOfTheWeek(intDay: number): string {

        switch (intDay) {
            case (0):
                return 'Sunday';
            case (1):
                return 'Monday';
            case (2):
                return 'Tuesday';
            case (3):
                return 'Wednesday';
            case (4):
                return 'Thursday';
            case (5):
                return 'Friday';
            case (6):
                return 'Saturday';
            default:
                console.log(`Day Int ${intDay} not found`);
                throw new Error(`Day Int ${intDay} not found`);
        }
    }

    getDisplayedTypes(optionArray: Options[]): string {
        let type = '';

        for (let i = 0; i < optionArray.length; i++) {

            if (i === 0) {
                type += `${optionArray[i].meetingOption}`;
                continue;
            }

            type += `/${optionArray[i].meetingOption}`;
        }



        return type;
    }
}
export interface Element {
    name: string;
    position: number;
    weight: number;
    symbol: string;
}


