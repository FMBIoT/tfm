import { Component, AfterViewInit } from '@angular/core';
import {latLng, MapOptions, tileLayer, Map, Marker, icon} from 'leaflet';

@Component({
  templateUrl: './dashboard.component.html',
  styleUrls: ['dashboard.component.scss']

})
export class DashboardComponent {
  subtitle: string;
  mapOptions!: MapOptions;
  map!: Map;
  constructor() {
    this.subtitle = 'This is some text within a card block.';
  }

	ngOnInit() {
	  this.initializeMapOptions();
	}
	
  	private initializeMapOptions() {
	  this.mapOptions = {
		center: latLng(44.4071,  8.93399),
		zoom: 12,
		layers: [
		  tileLayer(
			'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
			{
			  maxZoom: 5,
			  attribution: 'Map data © OpenStreetMap contributors'
			}),
			this.madrid, this.valencia, this.athens,this.paris
		],
	  };
	  
	}
	
	madrid = new Marker([ 40.4167, -3.70325 ], {
		icon: icon({
		  iconSize: [ 25, 41 ],
		  iconAnchor: [ 13, 41 ],
		  iconUrl: 'marker-icon.png',
		  shadowUrl: 'marker-shadow.png'
		})
	});
	valencia = new Marker([ 39.4702, -0.376805 ], {
		icon: icon({
		  iconSize: [ 25, 41 ],
		  iconAnchor: [ 13, 41 ],
		  iconUrl: 'marker-icon.png',
		  shadowUrl: 'marker-shadow.png'
		})
	});
	athens = new Marker([ 37.9816, 23.7308 ], {
		icon: icon({
		  iconSize: [ 25, 41 ],
		  iconAnchor: [ 13, 41 ],
		  iconUrl: 'marker-icon.png',
		  shadowUrl: 'marker-shadow.png'
		})
	});
	paris = new Marker([ 48.8032, 2.3511 ], {
		icon: icon({
		  iconSize: [ 25, 41 ],
		  iconAnchor: [ 13, 41 ],
		  iconUrl: 'marker-icon.png',
		  shadowUrl: 'marker-shadow.png'
		})
	});


}
