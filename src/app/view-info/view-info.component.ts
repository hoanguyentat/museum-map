import { Component, OnInit } from '@angular/core';
import { MapInfoService } from '../map-info.service';
import { RegionConfig } from '../region-config';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ParamMap } from '@angular/router/src/shared';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-info',
  templateUrl: './view-info.component.html',
  styleUrls: ['./view-info.component.css']
})
export class ViewInfoComponent implements OnInit {
  htmlDetail: string;
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
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      const id = paramMap.get('id');
      console.log(id);
      this.regionConfig = this.mapInfoService.getRegion(id);
      this.mapInfoService.getRegionDetail(id).subscribe(detail => { this.htmlDetail = detail; });
      console.log(this.regionConfig);
      this.mapInfoService.getProvinces(id).subscribe(data => {
        this.provincesData = data;
      });
      this.mapInfoService.getNationalParks(this.regionConfig.id).subscribe(data => {
        this.natureParksData = data;
      });
    });
  }

}
