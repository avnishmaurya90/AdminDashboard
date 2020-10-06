import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ErrorService } from './error.service';
import { ApiPage } from '../model';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  baseUrl = environment.baseUrl;

  constructor(
    private httpClient: HttpClient,
    private errorService: ErrorService
  ) { }

  list = query => {
    return this.httpClient
      .get<ApiPage[]>(`${this.baseUrl}/notifications`, {
        params: this.errorService.setQuery(query),
        headers: this.errorService.setHeaders()
      })
      .pipe(
        catchError(this.errorService.handleError),
        map((res: ApiPage) => res)
      );
  }

  markRead = model => {
    return this.httpClient
      .post(`${this.baseUrl}/notifications/mark/read`, model, {
        headers: this.errorService.setHeaders()
      })
      .pipe(
        catchError(this.errorService.handleError),
        map(res => res)
      );
  }
}
