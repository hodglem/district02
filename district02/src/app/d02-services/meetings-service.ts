
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import { Meetings } from '../classes/meeting';

@Injectable()
export class MeetingsService {
    url = 'http://127.0.0.1:8080/service/district02/meetings';
    typedMeetings: Meetings[] = [];

    constructor(private httpClient: HttpClient) {

    }

    public getMeetings(): Observable<Meetings[]> {
        this.typedMeetings.length = 0;

        return this.httpClient.get<Meetings[]>(this.url).map(
            resp => this.extractMeetings(resp),
            err => this.handleError(err)

        );
    }

    private extractMeetings(meetings: Meetings[]): Meetings[] {
        console.log(meetings);

        meetings.forEach(value => {
            this.typedMeetings.push(new Meetings().deserialize(value));
        });

        return meetings;
    }

    private handleError(error) {
        console.log(error);
    }


    // TODO Maybe move this to env specific
    private getHeaders(): object {
        const user = 'cory';
        const pw = 'pw';
        const h = {
            headers: new HttpHeaders({
                'Authorization': `Basic ${user} : ${pw}`,
                'Accept': 'application/json'
            })
        };
        return h;
    }
}

