import { Component, OnInit, Input } from '@angular/core';
import { City } from '../../../classes/city';
import { MeetingLocation } from '../../../classes/meeting-location';
import { Options } from '../../../classes/options';
import { AmPm } from '../../../d02-interfaces/ampm-interface';
import { Day } from '../../../d02-interfaces/day-interface';
import { Meetings } from '../../../classes/meeting';
import { MeetingOccur } from '../../../classes/meeting-occur';
import { PostMeetingService } from '../../../d02-services/post-meeting-service';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'meeting-manager',
    templateUrl: './meeting-manager.component.html',
    styleUrls: ['./meeting-manager.component.css']
})

export class MeetingManagerComponent implements OnInit {
    @Input('cities')
    cities: City[];
    @Input('locations')
    locations: MeetingLocation[];
    @Input('options')
    options: Options[];
    @Input('selectedMeeting')
    selectedMeeting: Meetings;
    days: Day[] = [
        { 'id': 0, 'name': 'Sunday' },
        { 'id': 1, 'name': 'Monday' },
        { 'id': 2, 'name': 'Tuesday' },
        { 'id': 3, 'name': 'Wednesday' },
        { 'id': 4, 'name': 'Thursday' },
        { 'id': 5, 'name': 'Friday' },
        { 'id': 6, 'name': 'Saturday' },
    ];
    hourValue = 7;
    minuteValue = 0;
    amPm: AmPm[] = [
        { 'id': 0, 'name': 'AM' },
        { 'id': 1, 'name': 'PM' },
    ];
    selectedCity: City;
    selectedDay: Day;
    selectedAmPm: AmPm = this.amPm[0];
    selectedLocation: MeetingLocation;
    selectedLocation1: MeetingLocation;
    selectedOptions: Options[];
    enteredLatitude: number;
    enteredLongitude: number;
    enteredName: string;

    constructor(private postMeetingService: PostMeetingService) {

    }

    ngOnInit(): void {

        if (this.selectedMeeting !== undefined) {
            this.setDefaultMeeting();
        }

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
            return this.selectedCity !== undefined && location.city.cityId === this.selectedCity.cityId;
        });
    }

    public addMeeting(): void {

        if (this.isValidMeeting()) {
            this.sendNewMeeting(this.buildMeeting());
        }

    }

    public isValidMeeting(): boolean {
        // TODO Create a Custom Dialog Component

        if (this.enteredName === undefined || this.enteredName.length <= 0) {
            alert('Name Required');
            return false;
        }

        if (this.selectedCity === undefined) {
            alert('City Selection Is Required');
            return false;
        }

        if (this.selectedDay === undefined) {
            alert('Day Selection Is Required');
            return false;
        }

        if (this.selectedLocation === undefined) {
            alert('Location Selection Is Required');
            return false;
        }

        if (this.selectedOptions === undefined || this.selectedOptions.length <= 0) {
            alert('At Least One Option Is Required');
            return false;
        }

        return true;
    }

    private setDefaultMeeting() {
        this.enteredName = this.selectedMeeting.name;
        this.selectedCity = this.selectedMeeting.meetingLocation.city;
        this.selectedDay = this.days.filter(day => {

            if (this.selectedMeeting.meetingOccur.day === day.id) {
                return day;
            }

        })[0];
        const timeString = this.selectedMeeting.meetingOccur.startTime.toLocaleString
            ('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
        this.hourValue = parseInt(timeString.split(':')[0], 10);
        this.hourValue = parseInt(timeString.split(':')[1], 10);
        this.selectedAmPm = this.amPm.filter(ampm => {

            if (ampm.name === timeString.split(' ')[1]) {
                return ampm;
            }
        })[0];

        this.selectedLocation = this.selectedMeeting.meetingLocation;
        this.selectedOptions = this.selectedMeeting.optionses;
    }

    private buildMeeting(): Meetings {
        const newMeeting = new Meetings();
        newMeeting.meetingLocation = this.selectedLocation;
        newMeeting.name = this.enteredName;
        newMeeting.optionses = this.selectedOptions;
        newMeeting.meetingOccur = this.buildMeetingOccur();
        return newMeeting;

    }

    private buildMeetingOccur(): MeetingOccur {
        const meetingOccur = new MeetingOccur();
        meetingOccur.day = this.selectedDay.id;
        const startTime: Date = new Date(`1 JAN 1970 ${this.hourValue}:${this.minuteValue} ${this.selectedAmPm.name}`);
        meetingOccur.startTime = startTime;
        // TO DO May need allow entry of End time for speical events?
        const endTime = new Date(`1 JAN 1970 ${this.hourValue + 1}:${this.minuteValue} ${this.selectedAmPm.name}`);
        meetingOccur.endTime = endTime;
        return meetingOccur;
    }

    private sendNewMeeting(newMeeting: Meetings): void {
        console.log(newMeeting);
        // TODO Need to add a progress spinner here
        this.postMeetingService.getPOSTObeservable(newMeeting).subscribe(addedMeeting => alert('Meeting Added'));
    }
}
