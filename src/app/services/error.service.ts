import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpHeaders, HttpParams, HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs/internal/observable/throwError';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  constructor(private httpClient: HttpClient) { }

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      return throwError('Network Problem');
    }
    if (!error.error) {
      console.log('crosscheck this msg', error);
      return;
    }
    return throwError(`${error.error.error}`);
  }

  setHeaders = () => {
    return new HttpHeaders().append(
      'x-access-token',
      localStorage.getItem('token')
    );
  }

  setQuery = (filters) => {
    return Object.getOwnPropertyNames(filters)
      .reduce((p, key) => p.append(key, filters[key]), new HttpParams());
  }

  getImage(imageUrl: string) {
    return this.httpClient.get(imageUrl, { observe: 'response', responseType: 'blob' })
      .pipe(map((res) => {
        return new Blob([res.body], { type: res.headers.get('Content-Type') });
      }));

  }
}
