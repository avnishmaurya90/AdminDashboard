import { Injectable } from '@angular/core';
import { ApiPage } from '../model';
import { catchError, map } from 'rxjs/operators';
import { ErrorService } from './error.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CityService {
  baseUrl = environment.baseUrl;
  constructor(
    private httpClient: HttpClient,
    private errorService: ErrorService
  ) { }

  list = query => {
    return this.httpClient
      .get<ApiPage[]>(`${this.baseUrl}/cities`, {
        params: this.errorService.setQuery(query),
        headers: this.errorService.setHeaders()
      })
      .pipe(
        catchError(this.errorService.handleError),
        map((res: ApiPage) => res)
      );
  }
}
