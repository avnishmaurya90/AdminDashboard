import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ErrorService } from '../../services/error.service';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  baseUrl = environment.baseUrl;

  constructor(
    private httpClient: HttpClient,
    private errorService: ErrorService
  ) { }

  download(query) {
    return this.httpClient.get(`${this.baseUrl}/vehicles/doc`,
      {
        params: this.errorService.setQuery(query),
        observe: 'response', responseType: 'blob'
      })
      .pipe(map((res) => {
        return new Blob([res.body], { type: res.headers.get('Content-Type') });
      }));
  }
}
