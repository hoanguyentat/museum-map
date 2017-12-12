import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { RegionConfig } from './region-config';
import { regionConfigs } from './region-data';

@Injectable()
export class MapInfoService {

  private baseUrl = '/assets/data';
  constructor(
    private http: HttpClient) { }

  getRegion(id: string): RegionConfig {
    return regionConfigs.find(ele => ele.id === id);
  }

  getRegionDetail(id: string): Observable<string> {
    const regionConfig = regionConfigs.find(ele => ele.id === id);
    return this.http.get(`${this.baseUrl}/${id}/${regionConfig.detailHtmlFile}`, { responseType: 'text' as 'text' });
  }

  getProvinces(id: string): Observable<any> {
    const regionConfig = regionConfigs.find(ele => ele.id === id);
    return this.http.get(`${this.baseUrl}/${id}/${regionConfig.provincesFile}`);
  }

  getNationalParks(id: string): Observable<any> {
    const regionConfig = regionConfigs.find(ele => ele.id === id);
    return this.http.get(`${this.baseUrl}/${id}/${regionConfig.naturalParksFile}`);
  }
}
