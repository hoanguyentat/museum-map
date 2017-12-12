import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { MapInfoService } from '../map-info.service';
import { geoJSON } from 'leaflet';
import { RegionConfig } from '../region-config';

@Component({
  selector: 'app-view-info',
  templateUrl: './view-info.component.html',
  styleUrls: ['./view-info.component.css']
})
export class ViewInfoComponent implements OnInit {
  htmlDetail: string;
  regionConfig: RegionConfig;
  options = {
    // layers: [
    //   L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
    // ],
    zoom: 7,
    center: L.latLng(21.731437, 105.512695)
  };
  layers: L.Layer[] = [];
  constructor(private mapInfoService: MapInfoService) { }

  ngOnInit() {
    this.regionConfig = this.mapInfoService.getRegion('dong-bac');
    console.log(this.regionConfig);
  }

  onMapReady(map: L.Map) {
    const regionConfig = this.regionConfig;

    const info: any = new L.Control();

    info.onAdd = function (_map) {
      this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
      this.update();
      return this._div;
    };

    // method that we will use to update the control based on feature properties passed
    info.update = function (props) {
      this._div.innerHTML = `<h4>Vùng ${regionConfig.name}</h4>`;
      // + (props ? '<b>' + props.TINH + '</b><br />' + props.NameUTF8 + ' people / mi<sup>2</sup>'
      //   : 'Hover over a state');
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

    info.addTo(map);

    function makeInteractiveGeoJsonLayer(data, customeStyle?): L.GeoJSON {
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
        info.update(layer.feature.properties);
        // if (!L.Browser.ie && !L.Browser.edge) {
        //   layer.bringToBack();
        // }
      }
      function resetHighlight(e) {
        geojson.resetStyle(e.target);
        info.update();
      }
      function zoomToFeature(e) {
        map.fitBounds(e.target.getBounds());
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
    this.mapInfoService.getRegionDetail('dong-bac').subscribe(detail => { this.htmlDetail = detail; });
    this.mapInfoService.getProvinces('dong-bac').subscribe(data => {
      // L.geoJSON(data).addTo(map).bringToBack();
      makeInteractiveGeoJsonLayer(data, { weight: 1.5 }).addTo(map).bringToBack();
    });
    this.mapInfoService.getNationalParks('dong-bac').subscribe(data => {
      this.layers.push(makeInteractiveGeoJsonLayer(data));
    });
  }

}
