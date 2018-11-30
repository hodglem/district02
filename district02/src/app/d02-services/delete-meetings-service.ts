import { DeleteService } from './abstract-delete-service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable()
export class DeleteMeetingsService extends DeleteService {
    url = 'http://127.0.0.1:8080/service/district02/meetings';

    constructor(protected httpClient: HttpClient) {
        super(httpClient);
    }



}
