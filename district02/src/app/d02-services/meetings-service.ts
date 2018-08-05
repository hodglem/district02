
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { HttpResponse } from "selenium-webdriver/http";
import 'rxjs/add/operator/map';

@Injectable()
export class MeetingsService {
    url = 'http://104.131.111.122:8080/service-0.0.1-SNAPSHOT/district02/testß';
    constructor(private httpClient: HttpClient) {

    }

    public getMeetings(): Observable<string[]> {
        return this.httpClient.get<string[]>(this.url).map(
            resp => this.extractMeetings(resp),
            err => this.handleError(err)

        );
    }

    private extractMeetings(meetings: string[]): string[] {
        console.log(meetings);
        return meetings;
    }

    private handleError(error) {
        console.log(error);
    }
}