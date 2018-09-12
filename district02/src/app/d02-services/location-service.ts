import { Injectable } from '@angular/core';
import { MeetingLocation } from '../classes/meeting-location';

import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { GetService } from './abstract-get-service';
import { Meetings } from '../classes/meeting';

@Injectable()
export class LocationService extends GetService<MeetingLocation> {
    public url = 'http://127.0.0.1:8080/service/district02/meeting-location';

    constructor(protected httpClient: HttpClient) {
        super(httpClient);
    }

    protected getNewObject(): MeetingLocation {
        return new MeetingLocation();
    }

}
