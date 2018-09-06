import { Component, OnInit, ViewChild } from '@angular/core';
import { MeetingsService } from '../../d02-services/meetings-service';
import { Meetings } from '../../classes/meeting';
import { Options } from '../../classes/options';
import { MatSort, MatTableDataSource } from '@angular/material';



@Component({
    selector: 'app-meetings',
    templateUrl: 'meetings.component.html',
    styleUrls: ['meetings.component.css', '../../app.component.css'],
})


export class MeetingsComponent implements OnInit {
    displayedColumns = ['city', 'day', 'time', 'name', 'location', 'address', 'type', 'map'];
    dataSource: MatTableDataSource <Meetings>;
    @ViewChild(MatSort) sort: MatSort;
    constructor(private meetingsService: MeetingsService) {

    }

    ngOnInit(): void {
        // TODO Refactor this to use a resolver
        this.meetingsService.getMeetings().subscribe(typedMeetings => {
            this.dataSource =  new MatTableDataSource(typedMeetings);
            this.dataSource.sort = this.sort;
        }
        );

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


