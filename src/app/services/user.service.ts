import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Login, User, ApiData, ApiPage, Device } from '../model';
import { map, catchError } from 'rxjs/operators';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = environment.baseUrl;
  constructor(
    private httpClient: HttpClient,
    private errorService: ErrorService
  ) { }

  login = (user: Login) => {
    return this.httpClient.post<User>(`${this.baseUrl}/users/login`, user).pipe(
      catchError(this.errorService.handleError),
      map((res: ApiData) => res.data)
    );
  }

  logout = (device: Device) => {
    const deviceDetails = {
      device: device
    };
    return this.httpClient
      .post<User>(`${this.baseUrl}/users/logout`, deviceDetails, {
        headers: this.errorService.setHeaders()
      })
      .pipe(
        catchError(this.errorService.handleError),
        map((res: ApiData) => res.data)
      );
  }

  list = query => {
    return this.httpClient
      .get<ApiPage[]>(`${this.baseUrl}/users`, {
        params: this.errorService.setQuery(query),
        headers: this.errorService.setHeaders()
      })
      .pipe(
        catchError(this.errorService.handleError),
        map((res: ApiPage) => res)
      );
  }

  downloadCsv = () => {
    return this.httpClient
      .get(`${this.baseUrl}/users/export/csv`, {
        observe: 'response', responseType: 'blob'
      })
      .pipe(
        catchError(this.errorService.handleError),
        map((res) => {
          return new Blob([res.body], { type: res.headers.get('Content-Type') });
        })
      );
  }
}
