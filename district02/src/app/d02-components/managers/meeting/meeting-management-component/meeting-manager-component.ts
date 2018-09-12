import { Component, OnInit, Input } from '@angular/core';
import { City } from '../../../../classes/city';
import { CityService } from '../../../../d02-services/city-service';
import { MeetingLocation } from '../../../../classes/meeting-location';
import { Options } from '../../../../classes/options';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'meeting-manager',
    templateUrl: './meeting-manager-component.html',
    styleUrls: ['./meeting-manager-component.css']
})

export class MeetingManagerComponent implements OnInit {
    @Input('cities')
    cities: City[] = [];
    @Input('locations')
    locations: MeetingLocation[];
    @Input('options')
    options: Options[];

    constructor() { }

    ngOnInit(): void {

    }


}
