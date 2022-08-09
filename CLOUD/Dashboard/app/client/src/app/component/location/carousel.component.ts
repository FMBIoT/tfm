import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import {latLng, MapOptions, tileLayer, Map, Marker, icon} from 'leaflet';


@Component({
	selector: 'app-ngbd-buttons-radio',
	templateUrl: './carousel.component.html',
	styleUrls:['carousel.component.scss']
})
export class NgbdCarouselBasicComponent{

	mapOptions!: MapOptions;
    map!: Map;
	constructor() {
	}

  
	ngOnInit() {
	  this.initializeMapOptions();
	}
  
	onMapReady(map:Map) {
	  this.map = map;
	  this.addSampleMarker();
	}
  
	private initializeMapOptions() {
	  this.mapOptions = {
		center: latLng(39.4702, -0.376805),
		zoom: 12,
		layers: [
		  tileLayer(
			'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
			{
			  maxZoom: 18,
			  attribution: 'Map data © OpenStreetMap contributors'
			})
		],
	  };
	}
  
	private addSampleMarker() {
	  const marker = new Marker([51.51, 0])
		.setIcon(
		  icon({
			iconSize: [25, 41],
			iconAnchor: [13, 41],
			iconUrl: 'assets/marker-icon.png'
		  }));
	  marker.addTo(this.map);
	}
  
}