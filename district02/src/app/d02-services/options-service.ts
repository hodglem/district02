import { GetService } from './abstract-get-service';
import { Options } from '../classes/options';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class OptionsService extends GetService<Options> {
    public url = 'http://localhost:8080/service/district02/options/';

    constructor(protected httpClient: HttpClient) {
        super(httpClient);
    }

    protected getNewObject(): Options {
        return new Options();
    }


}
