import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ErrorService } from '../../services/error.service';
import { catchError, map } from 'rxjs/operators';
import { ApiData } from '../../model';
import { Organization } from '../models/organization';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {
  baseUrl = environment.baseUrl;
  constructor(
    private httpClient: HttpClient,
    private errorService: ErrorService
  ) { }

  update = (id: string, model: any) => {
    return this.httpClient
      .put<Organization>(`${this.baseUrl}/organizations/${id}`, model, {
        headers: this.errorService.setHeaders()
      })
      .pipe(
        catchError(this.errorService.handleError),
        map((res: ApiData) => res.data)
      );
  }

  get = () => {
    return this.httpClient
      .get<Organization>(`${this.baseUrl}/organizations/`, {
        headers: this.errorService.setHeaders()
      })
      .pipe(
        catchError(this.errorService.handleError),
        map((res: ApiData) => res.data)
      );
  }
}
