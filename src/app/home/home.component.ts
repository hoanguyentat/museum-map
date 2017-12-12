import { Component, OnInit } from '@angular/core';
import { MapInfoService } from '../map-info.service';
import { RegionConfig } from '../region-config';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ParamMap } from '@angular/router/src/shared';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  regionConfig: RegionConfig;
  public provincesData: any;
  public natureParksData: any;
  constructor(
    private mapInfoService: MapInfoService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.regionConfig = this.mapInfoService.getRegion();
    console.log(this.regionConfig);
    this.mapInfoService.getProvinces().subscribe(data => {
      this.provincesData = data;
    });
    this.mapInfoService.getNationalParks().subscribe(data => {
      this.natureParksData = data;
    });
  }

}
