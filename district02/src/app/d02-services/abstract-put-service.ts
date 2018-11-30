import { Serializable } from '../classes/serializable';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { PostService } from './abstract-post-service';

export abstract class PutService<T extends Serializable<T>> extends PostService<any> {
    abstract url: string;
    protected abstract getNewObject();

    constructor(protected httpClient: HttpClient) {
        super(httpClient);
    }

    public getPutObservable(puttingObject: Serializable<T>): Observable<any> {
        return this.httpClient.put<T>(this.url, puttingObject, this.getHeaders()).map(
            resp => this.handleEmptyResponse(resp),
            err => this.handleError(err)
        );
    }

    protected handleEmptyResponse(response: any): void {

    }
}
