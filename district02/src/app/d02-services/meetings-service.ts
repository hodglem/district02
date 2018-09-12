
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import { Meetings } from '../classes/meeting';
import { GetService } from './abstract-get-service';

@Injectable()
export class MeetingsService extends GetService<Meetings> {
    url = 'http://127.0.0.1:8080/service/district02/meetings';
    typedMeetings: Meetings[] = [];

    constructor(public httpClient: HttpClient) {
        super(httpClient);
    }

    protected getNewObject(): Meetings {
        return new Meetings();
    }
}

