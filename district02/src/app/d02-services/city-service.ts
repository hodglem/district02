import { Injectable } from '@angular/core';
import { City } from '../classes/city';
import { HttpClient} from '@angular/common/http';
import { GetService } from './abstract-get-service';



@Injectable()
export class CityService extends GetService<City> {
    public url = 'http://127.0.0.1:8080/service/district02/city';

    constructor(protected httpClient: HttpClient) {
        super(httpClient);
    }

    protected getNewObject(): City {
        return new City();
    }


}
