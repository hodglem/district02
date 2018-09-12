import { Component, OnInit, Input } from '@angular/core';
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
    @Input('cities')
    cities: City[];
    @Input('locations')
    locations: MeetingLocation[];
    @Input('options')
    options: Options[];
    days: Object[];
    hourValue = 7;
    minuteValue = 0;
    amPm = 0;
    selectedCityId = 0;

    ngOnInit(): void {


    }

    public getAmPmText(radioValue: string): string {
        switch (parseInt(radioValue, 10)) {
            case (0):
                return 'AM';
            case (1):
                return 'PM';
            default:
                return 'ERROR';
        }
    }
    public getApplicableLocations(): MeetingLocation[] {
        return this.locations.filter(location => {
            return location.city.cityId === this.selectedCityId
                && this.selectedCityId !== 0;

        });
    }
}
