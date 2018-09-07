import { Component, OnInit } from '@angular/core';
import { City } from '../../../../classes/city';
import { MeetingLocation } from '../../../../classes/meeting-location';
import { Options } from '../../../../classes/options';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'add-meeting',
    templateUrl: './add-meeting.component.html',
    styleUrls: ['./add-meeting.component.css']
})

export class AddMeetingComponent implements OnInit {
    cities: City[] = [];
    days: Object[];
    locations: MeetingLocation[] = [];
    option: Options[] = [];
    ngOnInit(): void {

        for (let i = 0; i < 10; i++) {
            const c = new City();
            c.name = `City ${i}`;
            this.cities.push(c);

            const l = new MeetingLocation();
            l.id = i;
            l.name = `Place ${i}`;
            l.address = '12345 Daive Rd';
            this.locations.push(l);
            //
        }

        this.days = [
            { 'id': 0, 'name': 'Sunday' },
            { 'id': 1, 'name': 'Monday' },
            { 'id': 2, 'name': 'Tuesday' },
            { 'id': 3, 'name': 'Wednesday' },
            { 'id': 4, 'name': 'Thursday' },
            { 'id': 5, 'name': 'Friday' },
            { 'id': 6, 'name': 'Saturday' },
        ];


    }
}
