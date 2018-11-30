import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { City } from '../../../classes/city';
import { MeetingLocation } from '../../../classes/meeting-location';
import { Options } from '../../../classes/options';
import { AmPm } from '../../../d02-interfaces/ampm-interface';
import { Day } from '../../../d02-interfaces/day-interface';
import { Meetings } from '../../../classes/meeting';
import { MeetingOccur } from '../../../classes/meeting-occur';
import { PostMeetingService } from '../../../d02-services/post-meeting-service';
import { MeetingsService } from '../../../d02-services/meetings-service';
import { DatePipe } from '@angular/common';
import { PutMeetingsService } from '../../../d02-services/put-meeting-service';
import { MeetingsTableComponent } from '../../meetings-table-component/meetings-table.component';
import { DeleteMeetingsService } from '../../../d02-services/delete-meetings-service';


@Component({
    // tslint:disable-next-line:component-selector
    selector: 'meeting-manager',
    templateUrl: './meeting-manager.component.html',
    styleUrls: ['./meeting-manager.component.css'],
    providers: [DatePipe]
})

export class MeetingManagerComponent implements OnInit {
    @Input('cities')
    cities: City[];
    @Input('locations')
    locations: MeetingLocation[];
    @Input('options')
    options: Options[];
    selectedMeeting: Meetings;
    @ViewChild('citySelect') citySelect;
    @ViewChild('meetingsTable') table: MeetingsTableComponent;

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
    enteredName: string;
    displayedColumns = ['select', 'city', 'day', 'time', 'name', 'location', 'address', 'type', 'map'];
    currentAction: Action = Action.ADD;
    rowSelected = false;

    constructor(private postMeetingService: PostMeetingService, private meetingsService: MeetingsService,
        private datePipe: DatePipe, private putMeetingService: PutMeetingsService,
        private deleteMeetingServices: DeleteMeetingsService) {


    }

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
        if (this.selectedCity === null) {
            return [];
        }
        return this.locations.filter(location => {
            return this.selectedCity !== undefined && location.city.cityId === this.selectedCity.cityId;
        });
    }

    public actionClicked(): void {
        if (this.isValidMeeting()) {

            if (this.currentAction === Action.ADD) {
                this.sendNewMeeting(this.buildMeeting());
            } else if (this.currentAction === Action.UPDATE) {
                this.updateMeeting(this.buildUpdatedMeeting());
            }
        }
    }

    public deleteClicked(): void {
        this.deleteMeetingServices.deleteItem(this.selectedMeeting.id).subscribe(deletedMeeting => {
            this.deleteMeeting();
        }
        );
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

    public selectionEvent(meetingSelected: number) {
        if (meetingSelected > 0) {
            this.meetingsService.getCachedArray().forEach(meeting => {

                if (meeting.id === meetingSelected) {
                    this.selectedMeeting = meeting;
                    this.populcateSelectedMeetingMeeting();
                    this.currentAction = Action.UPDATE;
                    this.rowSelected = true;
                }
            }
            );
        } else {
            this.currentAction = Action.ADD;
            this.rowSelected = false;
            this.defaultForm();
        }
    }

    private populcateSelectedMeetingMeeting() {
        this.enteredName = this.selectedMeeting.name;
        this.setSelectedCity();
        this.setSelectedDay();
        this.setSelectedLocation();
        this.setSelectedTime();
        this.setSelectedOptions();
    }

    private setSelectedCity() {
        this.cities.forEach(city => {

            if (city.cityId === this.selectedMeeting.meetingLocation.city.cityId) {
                this.selectedCity = city;
            }
        }
        );
    }

    private setSelectedTime() {
        this.hourValue = parseInt(this.datePipe.transform(this.selectedMeeting.meetingOccur.startTime, 'h'), 10);
        this.minuteValue = parseInt(this.datePipe.transform(this.selectedMeeting.meetingOccur.startTime, 'mm'), 10);
        this.amPm.forEach(amPm => {

            if (amPm.name === this.datePipe.transform(this.selectedMeeting.meetingOccur.startTime, 'a')) {
                this.selectedAmPm = amPm;
            }
        });

    }

    private setSelectedDay() {
        this.days.forEach(day => {

            if (day.id === this.selectedMeeting.meetingOccur.day) {
                this.selectedDay = day;
            }
        }
        );
    }

    private setSelectedLocation() {
        this.getApplicableLocations().forEach(location => {

            if (location.id === this.selectedMeeting.meetingLocation.id) {
                this.selectedLocation = location;
            }
        }
        );
    }

    private setSelectedOptions() {

        if (this.selectedOptions === undefined) {
            this.selectedOptions = [];
        }

        this.selectedOptions.length = 0;
        this.options.forEach(option => {

            this.selectedMeeting.optionses.forEach(selectedOption => {

                if (option.id === selectedOption.id) {
                    this.selectedOptions.push(option);
                }
            });

        }
        );
    }

    private buildMeeting(): Meetings {
        const newMeeting = new Meetings();
        newMeeting.meetingLocation = this.selectedLocation;
        newMeeting.name = this.enteredName;
        newMeeting.optionses = this.selectedOptions;
        newMeeting.meetingOccur = this.buildMeetingOccur();
        return newMeeting;

    }

    private buildUpdatedMeeting(): Meetings {
        const updatedMeeting = new Meetings();
        updatedMeeting.id = this.selectedMeeting.id;
        updatedMeeting.meetingLocation = this.selectedLocation;
        updatedMeeting.name = this.enteredName;
        updatedMeeting.optionses = this.selectedOptions;
        updatedMeeting.meetingOccur = this.buildMeetingOccur();
        updatedMeeting.meetingOccur.id = this.selectedMeeting.meetingOccur.id;
        return updatedMeeting;
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
        this.postMeetingService.getPOSTObeservable(newMeeting).subscribe(addedMeeting => {
            alert('Meeting Added');
            this.refreshForm();
        }
        );
    }

    private updateMeeting(updatedMeeting: Meetings): void {
        console.log(updatedMeeting);
        this.putMeetingService.getPutObservable(updatedMeeting).subscribe(uMeeting => {
            alert('Meeting Updated');
            this.refreshForm();
        }
        );
    }

    private deleteMeeting(): void {
        alert('Meeting Deleted');
        this.refreshForm();
    }

    private refreshForm(): void {
        this.selectedCity = null;
        this.selectedDay = null;
        this.selectedAmPm = this.amPm[0];
        this.selectedLocation = null;
        this.selectedLocation1 = null;
        this.selectedOptions = undefined;
        this.enteredName = null;
        this.table.refreshMeetings();
        this.rowSelected = false;
        this.currentAction = Action.ADD;
        console.log(this.selectedOptions);
    }

    public defaultForm() {
        this.selectedCity = null;
        this.selectedDay = null;
        this.selectedAmPm = this.amPm[0];
        this.selectedLocation = null;
        this.selectedLocation1 = null;
        this.selectedOptions = undefined;
        this.enteredName = null;
        this.rowSelected = false;
        this.currentAction = Action.ADD;
        console.log(this.selectedOptions);
    }
}

enum Action {
    ADD = 'Add',
    UPDATE = 'Update'
}
