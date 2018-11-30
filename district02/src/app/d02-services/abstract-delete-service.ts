import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
export abstract class DeleteService {
    abstract url: string;

    constructor(protected httpClient: HttpClient) {

    }

    public deleteItem(id: number) {
        const definedUrl = `${this.url}/${id}`;
        return this.httpClient.delete(definedUrl, this.getHeaders()).map(
            resp => this.handleReposne(resp),
            err => this.handleError(err)

        );
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

    protected handleError(error): ErrorObservable {
        console.error(error);
        return new ErrorObservable(
            'Something bad happened; please try again later.');
    }

    protected handleReposne(rawJSON: any) {

    }
}
