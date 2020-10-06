import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ErrorService } from '../../services/error.service';
import { ApiPage, ApiData, Login } from '../../model';
import { catchError, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Vendor } from '../models/vendor';

@Injectable({
  providedIn: 'root'
})
export class VendorService {
  baseUrl = environment.baseUrl;

  constructor(
    private httpClient: HttpClient,
    private errorService: ErrorService
  ) { }

  list = query => {
    return this.httpClient
      .get<ApiPage>(`${this.baseUrl}/vendors`, {
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
      .put<Vendor>(`${this.baseUrl}/vendors/${id}`, model, {
        headers: this.errorService.setHeaders()
      })
      .pipe(
        catchError(this.errorService.handleError),
        map((res: ApiData) => res.data)
      );
  }

  getStats = () => {
    return this.httpClient
      .get(`${this.baseUrl}/vendors/stats`, {
        headers: this.errorService.setHeaders()
      })
      .pipe(
        catchError(this.errorService.handleError),
        map((res: ApiData) => res.data)
      );
  }

  login = (vendorLoginModel: Login) => {
    return this.httpClient
      .post<Vendor>(`${this.baseUrl}/vendors/login`, vendorLoginModel)
      .pipe(
        catchError(this.errorService.handleError),
        map((res: ApiData) => res.data)
      );
  }

  blockedList = query => {
    return this.httpClient
      .get<ApiPage>(`${this.baseUrl}/vendors/blocked`, {
        params: this.errorService.setQuery(query),
        headers: this.errorService.setHeaders()
      })
      .pipe(
        catchError(this.errorService.handleError),
        map((res: ApiPage) => res)
      );
  }
}
