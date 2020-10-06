import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ErrorService } from './error.service';
import { ApiData } from '../model';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  baseUrl = environment.baseUrl;
  constructor(
    private httpClient: HttpClient,
    private errorService: ErrorService
  ) { }

  create = (formData, query) => {
    const data = new FormData();
    data.append('file', formData);
    return this.httpClient
      .post<ApiData>(`${this.baseUrl}/files`, data, {
        params: this.errorService.setQuery(query)
      })
      .pipe(
        catchError(this.errorService.handleError),
        map((res: ApiData) => res)
      );
  }
}
