import { PostService } from './abstract-post-service';
import { Meetings } from '../classes/meeting';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class PostMeetingService extends PostService<Meetings> {
    url = 'http://localhost:8080/service/district02/meetings/';

    constructor(protected httpClient: HttpClient) {
        super(httpClient);
    }

    protected getNewObject(): Meetings {
        return new Meetings();
    }
}
