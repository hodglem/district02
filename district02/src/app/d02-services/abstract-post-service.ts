import { Serializable } from '../classes/serializable';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';


export abstract class PostService<T extends Serializable<T>> {
    abstract url: string;
    protected abstract getNewObject(): T;

    constructor(protected httpClient: HttpClient) {

    }

    public getPOSTObeservable(postingObject: Serializable<T>): Observable<T> {
        return this.httpClient.post<T>(this.url, postingObject, this.getHeaders()).map(
            resp => this.extractPersistedTypedObject(resp),
            err => this.handleError(err)
        );
    }

    protected extractPersistedTypedObject(rawJson: any) {
        console.log(rawJson);
        return this.getNewObject().deserialize(rawJson);
    }

    protected getHeaders(): object {
        const user = 'cory';
        const pw = 'pw';
        const h = {
            headers: new HttpHeaders({
                'Authorization': `Basic ${btoa(user)} : ${btoa(pw)}`,
                'Content-Type': 'application/json'
            })
        };
        return h;
    }

    protected handleError(error) {
        console.error(error);
    }

}
