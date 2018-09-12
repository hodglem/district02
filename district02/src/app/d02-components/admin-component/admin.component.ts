import { Component, OnInit } from '@angular/core';
import { City } from '../../classes/city';
import { CityService } from '../../d02-services/city-service';
import { MeetingLocation } from '../../classes/meeting-location';
import { LocationService } from '../../d02-services/location-service';
import { OptionsService } from '../../d02-services/options-service';
import { Options } from '../../classes/options';

@Component({
    selector: 'admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.css']
})


export class AdminComponent implements OnInit {
    cities: City[] = [];
    locations: MeetingLocation[] = [];
    options: Options[] = [];

    constructor(private cityService: CityService, private locationService: LocationService, private optionsService: OptionsService) { }

    ngOnInit(): void {
        this.cityService.getTypedObservable().subscribe(cities => this.cities.push(...cities));
        this.locationService.getTypedObservable().subscribe(locations => this.locations.push(...locations));
        this.optionsService.getTypedObservable().subscribe(options => this.options.push(...options));
    }
}
