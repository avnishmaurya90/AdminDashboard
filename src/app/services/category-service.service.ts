import { Injectable } from '@angular/core';
import { ErrorService } from './error.service';
import { ApiPage } from '../model';
import { environment } from 'src/environments/environment';
import { catchError, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryServiceService {
  baseUrl = environment.baseUrl;

  constructor(private httpClient: HttpClient,
    private errorService: ErrorService) { }

  list = query => {
    return this.httpClient
      .get<ApiPage[]>(`${this.baseUrl}/categories`, {
        params: this.errorService.setQuery(query),
        headers: this.errorService.setHeaders()
      })
      .pipe(
        catchError(this.errorService.handleError),
        map((res: ApiPage) => res)
      );
  }
}
