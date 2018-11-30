import { PutService } from './abstract-put-service';
import { Injectable } from '@angular/core';
import { Meetings } from '../classes/meeting';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class PutMeetingsService extends PutService<Meetings> {
    url = 'http://localhost:8080/service/district02/meetings/';

    constructor(protected httpClient: HttpClient) {
        super(httpClient);
    }
    protected getNewObject() {
        return new Meetings();
    }


}