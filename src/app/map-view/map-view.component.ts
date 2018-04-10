import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import * as L from 'leaflet';
import { MapInfoService } from '../map-info.service';
import { geoJSON } from 'leaflet';
import { RegionConfig } from '../region-config';
import { concat } from 'rxjs/operators/concat';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.css']
})
export class MapViewComponent implements OnInit, OnChanges {

  @Input() regionConfig: RegionConfig;
  options = {
    layers: [
      L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
    ],
    zoom: 7,
    center: L.latLng(21.731437, 105.512695)
  };

  info: any = new L.Control();
  @Input() provincesData: any;
  @Input() natureParksData: any;
  provincesLayer: L.GeoJSON;
  natureParksLayer: L.GeoJSON;
  map: L.Map;
  constructor() { }

  initInfoControl(): void {
    const that = this;
    this.info.onAdd = function (_map) {
      this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
      this.update();
      return this._div;
    };

    this.info.update = function (props) {
      this._div.innerHTML = that.regionConfig ? `<h4>Vùng ${that.regionConfig.name}</h4>` : '';
      if (!props) {
        this._div.innerHTML += 'Hover over a state';
        return;
      }
      if (props.TINH) {
        this._div.innerHTML += `<span>Tỉnh: </span><b>${props.TINH}</b><br />`;
      }
      if (props.NameUTF8) {
        this._div.innerHTML += `<span>Vườn quốc gia: </span><b>${props.NameUTF8}</b>`;
      }
    };
  }

  makeInteractiveGeoJsonLayer(data, customeStyle?): L.GeoJSON {
    const that = this;
    let geojson;
    function style(feature) {
      function stringToColour(str: string) {
        str = str ? str : ' ';
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
          hash = str.charCodeAt(i) + ((hash << 5) - hash);
        }
        let colour = '#';
        for (let i = 0; i < 3; i++) {
          const value = (hash >> (i * 8)) & 0xFF;
          colour += ('00' + value.toString(16)).substr(-2);
        }
        return colour;
      }
      return {
        fillColor: stringToColour(feature.properties.NameUTF8),
        weight: 1,
        opacity: 1,
        // color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
      };
    }

    function highlightFeature(e) {
      const layer = e.target;
      layer.setStyle({
        weight: 1,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7,
        fillColor: '#666'
      });
      that.info.update(layer.feature.properties);
      // if (!L.Browser.ie && !L.Browser.edge) {
      //   layer.bringToBack();
      // }
    }
    function resetHighlight(e) {
      geojson.resetStyle(e.target);
      that.info.update();
    }
    function zoomToFeature(e) {
      that.map.fitBounds(e.target.getBounds());
    }
    function onEachFeature(feature, layer) {
      layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
      });
    }

    geojson = L.geoJSON(data, {
      style: customeStyle ? customeStyle : style,
      onEachFeature: onEachFeature
    });
    return geojson;
  }

  resetMap(): void {
    if (this.provincesLayer) {
      this.map.removeLayer(this.provincesLayer);
    }
    if (this.natureParksLayer) {
      this.map.removeLayer(this.natureParksLayer);
    }
  }

  ngOnInit() {
    this.initInfoControl();
    console.log('ngOnInit');
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (!this.map) {
      return;
    }
    this.info.update();
    this.resetMap();

    if (this.provincesData) {
      this.provincesLayer = this.makeInteractiveGeoJsonLayer(this.provincesData, { weight: 1.5 });
      this.provincesLayer.addTo(this.map).bringToBack();
      this.map.flyToBounds(this.provincesLayer.getBounds());
    }
    if (this.natureParksData) {
      this.natureParksLayer = this.makeInteractiveGeoJsonLayer(this.natureParksData);
      this.natureParksLayer.addTo(this.map);
    }
    console.log('ngOnChanges');
  }

  onMapReady(map: L.Map) {
    console.log('map ready');
    this.info.addTo(map);
    this.map = map;
  }

  flyToBounds(bounds: L.LatLngBounds): void {
    this.map.flyToBounds(bounds);
  }

}
