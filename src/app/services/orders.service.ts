import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ApiPage, ApiData } from '../model';
import { map, catchError } from 'rxjs/operators';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  baseUrl = environment.baseUrl;
  constructor(
    private httpClient: HttpClient,
    private errorService: ErrorService
  ) { }

  list = query => {
    return this.httpClient
      .get<ApiPage[]>(`${this.baseUrl}/orders`, {
        params: this.errorService.setQuery(query),
        headers: this.errorService.setHeaders()
      })
      .pipe(
        catchError(this.errorService.handleError),
        map((res: ApiPage) => res)
      );
  }

  pdf = code => {
    return this.httpClient
      .get(`${this.baseUrl}/orders/${code}.pdf`, {
        observe: 'response',
        responseType: 'blob'
      })
      .pipe(
        catchError(this.errorService.handleError),
        map(res => {
          return new Blob([res.body], {
            type: res.headers.get('Content-Type')
          });
        })
      );
  }

  stats = query => {
    return this.httpClient
      .get(`${this.baseUrl}/orders/stats`, {
        params: this.errorService.setQuery(query),
        headers: this.errorService.setHeaders()
      })
      .pipe(
        catchError(this.errorService.handleError),
        map((res: ApiData) => res)
      );
  }
}
