import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { MapInfoService } from '../map-info.service';

@Component({
  selector: 'app-view-info',
  templateUrl: './view-info.component.html',
  styleUrls: ['./view-info.component.css']
})
export class ViewInfoComponent implements OnInit {
  htmlDetail: string;
  options = {
    layers: [
      L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
    ],
    zoom: 5,
    center: L.latLng(46.879966, -121.726909)
  };
  constructor(private mapInfoService: MapInfoService) { }

  ngOnInit() {
    this.mapInfoService.getRegionDetail('dong-bac').subscribe(detail => { this.htmlDetail = detail; });
  }

}
