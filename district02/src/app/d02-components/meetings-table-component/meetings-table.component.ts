import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { DisplayedMeeting } from '../../classes/displayed-meeting';
import { Options } from '../../classes/options';
import { MeetingsService } from '../../d02-services/meetings-service';
import { Meetings } from '../../classes/meeting';

@Component({
    selector: 'app-meetings-table',
    templateUrl: './meetings-table.component.html',
    styleUrls: ['./meetings-table.component.css']


})

export class MeetingsTableComponent implements OnInit {
    dataSource: MatTableDataSource<DisplayedMeeting>;
    @Input()
    displayedColumns;
    @Output()
    isSelected: EventEmitter<number> = new EventEmitter();
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    displayedMeetings: DisplayedMeeting[] = [];

    constructor(private meetingsService: MeetingsService) {

    }

    ngOnInit(): void {
        this.refreshMeetings();
    }

    public refreshMeetings() {
        this.meetingsService.getTypedObservable().subscribe(typedMeetings => {
            this.dataSource = new MatTableDataSource(this.buildDisplayedMeetings(typedMeetings));
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
        });
    }

    public meetingSelected(id: number) {

        this.displayedMeetings.forEach(meeting => {

            if (meeting.id === id && meeting.checked) {
                this.isSelected.emit(meeting.id);
                return;
            } else if (meeting.id === id && !meeting.checked) {
                this.isSelected.emit(-99);
                return;
            }

            meeting.checked = false;
        }
        );
    }


    private buildDisplayedMeetings(typedMeetings: Meetings[]): DisplayedMeeting[] {
        this.displayedMeetings.length = 0;

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
            this.displayedMeetings.push(displayedMeeting);
        });

        return this.displayedMeetings;
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

}


export interface Element {
    name: string;
    position: number;
    weight: number;
    symbol: string;
}

