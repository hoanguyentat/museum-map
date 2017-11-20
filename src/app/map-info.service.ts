import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable()
export class MapInfoService {

  private baseUrl = '/assets/data';
  constructor(
    private http: HttpClient) {}

  getRegionDetail(id: string): Observable<string> {
    return this.http.get(`${this.baseUrl}/${id}/detail.html`, {responseType: 'text' as 'text'});
  }
}
