import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ErrorService } from './error.service';
import { Login, ApiData, Device, ApiPage } from '../model';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PanelService {
  baseUrl = environment.baseUrl;
  constructor(private httpClient: HttpClient,
    private errorService: ErrorService) { }

  login = (user: Login) => {
    return this.httpClient.post(`${this.baseUrl}/panels/login`, user).pipe(
      catchError(this.errorService.handleError),
      map((res: ApiData) => res.data)
    );
  }

  adminLogin = (user: Login) => {
    return this.httpClient.post(`${this.baseUrl}/panels/admin/login`, user).pipe(
      catchError(this.errorService.handleError),
      map((res: ApiData) => res.data)
    );
  }

  invoicesList = query => {
    return this.httpClient.get(`${this.baseUrl}/panels/invoices`, {
      params: this.errorService.setQuery(query),
      headers: this.errorService.setHeaders()
    }).pipe(
      catchError(this.errorService.handleError),
      map((res: ApiPage) => res)
    );
  }

  adminStats = query => {
    return this.httpClient.get(`${this.baseUrl}/panels/admin/stats`, {
      params: this.errorService.setQuery(query),
      headers: this.errorService.setHeaders()
    }).pipe(
      catchError(this.errorService.handleError),
      map((res: ApiData) => res.data)
    );
  }

  logout = (device: Device) => {
    const deviceDetails = {
      device: device
    };
    return this.httpClient
      .post(`${this.baseUrl}/panels/logout`, deviceDetails, {
        headers: this.errorService.setHeaders()
      })
      .pipe(
        catchError(this.errorService.handleError),
        map((res: ApiData) => res.data)
      );
  }
}
