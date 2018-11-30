import { Observable } from 'rxjs/Observable';
import { Serializable } from '../classes/serializable';
import { HttpHeaders, HttpClient } from '@angular/common/http';


export abstract class GetService<T extends Serializable<T>> {
    typedArray: T[] = [];
    abstract url: string;
    protected cachedArray: T[];
    protected abstract getNewObject(): T;

    constructor(protected httpClient: HttpClient) {

    }

    public getTypedObservable(): Observable<T[]> {
        this.typedArray.length = 0;
        return this.httpClient.get<T[]>(this.url, this.getHeaders()).map(
            resp => this.extractTypedArray(resp),
            err => this.handleError(err)
        );
    }

    public getCachedArray(): T[] {
        return this.cachedArray;
    }

    protected extractTypedArray(rawJson: any[]): T[] {
        rawJson.forEach(unTypedObject => {
            this.typedArray.push(this.getNewObject().deserialize(unTypedObject));
        });

        this.cachedArray = this.typedArray;
        return this.typedArray;
    }

    protected handleError(error) {
        alert('Action Failed');
        console.error(error);
    }

    protected getHeaders(): object {
        const user = 'cory';
        const pw = 'pw';
        const h = {
            headers: new HttpHeaders({
                'Authorization': `Basic ${btoa(user)} : ${btoa(pw)}`
            })
        };
        return h;
    }
}
