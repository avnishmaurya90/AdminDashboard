import { Injectable } from '@angular/core';
import { Fare } from '../models/fare';
import { HttpClient } from '@angular/common/http';
import { ErrorService } from '../../services/error.service';
import { catchError, map } from 'rxjs/operators';
import { ApiData, ApiPage } from '../../model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FareService {
  baseUrl = environment.baseUrl;
  constructor(
    private httpClient: HttpClient,
    private errorService: ErrorService
  ) { }

  create = (fare: Fare) => {
    return this.httpClient
      .post<Fare>(`${this.baseUrl}/fares`, fare, {
        headers: this.errorService.setHeaders()
      })
      .pipe(
        catchError(this.errorService.handleError),
        map((res: ApiData) => res.data)
      );
  }

  update = (id: string, fare: Fare) => {
    return this.httpClient
      .put<Fare>(`${this.baseUrl}/fares/${id}`, fare, {
        headers: this.errorService.setHeaders()
      })
      .pipe(
        catchError(this.errorService.handleError),
        map((res: ApiData) => res.data)
      );
  }

  list = query => {
    return this.httpClient
      .get<ApiPage[]>(`${this.baseUrl}/fares`, {
        params: this.errorService.setQuery(query),
        headers: this.errorService.setHeaders()
      })
      .pipe(
        catchError(this.errorService.handleError),
        map((res: ApiPage) => res.items)
      );
  }

  get = id => {
    return this.httpClient
      .get<Fare[]>(`${this.baseUrl}/fares/${id}`, {
        headers: this.errorService.setHeaders()
      })
      .pipe(
        catchError(this.errorService.handleError),
        map((res: ApiData) => res.data)
      );
  }
}
