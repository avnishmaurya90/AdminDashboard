import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Driver } from '../models/driver';
import { ErrorService } from '../../services/error.service';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { ApiPage, ApiData } from '../../model';

@Injectable({
  providedIn: 'root'
})
export class DriverService {
  baseUrl = environment.baseUrl;

  constructor(
    private httpClient: HttpClient,
    private errorService: ErrorService
  ) { }

  list = query => {
    return this.httpClient
      .get<ApiPage>(`${this.baseUrl}/drivers`, {
        params: this.errorService.setQuery(query),
        headers: this.errorService.setHeaders()
      })
      .pipe(
        catchError(this.errorService.handleError),
        map((res: ApiPage) => res)
      );
  }

  driverDelete = id => {
    return this.httpClient.delete(`${this.baseUrl}/panels/drivers/${id}`, {
      headers: this.errorService.setHeaders()
    })
      .pipe(
        catchError(this.errorService.handleError),
        map((res: any) => res)
      );
  }

  driverAccountUpdate = (id, driver) => {
    return this.httpClient.put(`${this.baseUrl}/panels/drivers/${id}`, driver, {
      headers: this.errorService.setHeaders()
    })
      .pipe(
        catchError(this.errorService.handleError),
        map((res: any) => res)
      );
  }

  detailedList = query => {
    return this.httpClient
      .get<ApiPage>(`${this.baseUrl}/drivers/details`, {
        params: this.errorService.setQuery(query),
        headers: this.errorService.setHeaders()
      })
      .pipe(
        catchError(this.errorService.handleError),
        map((res: ApiPage) => res)
      );
  }

  blockedList = query => {
    return this.httpClient
      .get<ApiPage>(`${this.baseUrl}/drivers/blocked`, {
        params: this.errorService.setQuery(query),
        headers: this.errorService.setHeaders()
      })
      .pipe(
        catchError(this.errorService.handleError),
        map((res: ApiPage) => res)
      );
  }

  update = (id, model) => {
    return this.httpClient
      .put<Driver>(`${this.baseUrl}/drivers/${id}`, model, {
        headers: this.errorService.setHeaders()
      })
      .pipe(
        catchError(this.errorService.handleError),
        map((res: ApiData) => res.data)
      );
  }
}
