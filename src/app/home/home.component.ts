import { Component, OnInit, ViewChild } from '@angular/core';
import { MapInfoService } from '../map-info.service';
import { RegionConfig } from '../region-config';
import * as L from 'leaflet';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ParamMap } from '@angular/router/src/shared';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { of } from 'rxjs/observable/of';

import {
  debounceTime, distinctUntilChanged, switchMap, tap
} from 'rxjs/operators';
import { MapViewComponent } from '../map-view/map-view.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  naturalParks$: Observable<any[]>;
  private searchTerms = new Subject<string>();

  @ViewChild(MapViewComponent)
  private mapComponent: MapViewComponent;

  regionConfig: RegionConfig;
  public provincesData: any;
  public natureParksData: any;
  constructor(
    private mapInfoService: MapInfoService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router
  ) { }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  openNav(): void {
      document.getElementById("mySidenav").style.width = "250px";
      // document.getElementById("main").style.marginLeft = "250px";
  }

  closeNav(): void {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft= "0";
  }

  ngOnInit(): void {
    this.regionConfig = this.mapInfoService.getRegion();
    console.log(this.regionConfig);
    this.mapInfoService.getProvinces().subscribe(data => {
      this.provincesData = data;
    });
    this.mapInfoService.getNationalParks().subscribe(data => {
      this.natureParksData = data;
    });

    this.naturalParks$ = this.searchTerms.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((term: string) => this.mapInfoService.searchNationalPark(term)),
    );
  }

  clickOnNaturalPark(naturalPark: any): void {
    const bounds = L.geoJSON(naturalPark).getBounds();
    this.mapComponent.flyToBounds(bounds);
  }

}
