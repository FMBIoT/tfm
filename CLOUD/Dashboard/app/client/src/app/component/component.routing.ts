import { Routes } from '@angular/router';

import { NgbdAccordionBasicComponent } from './historical/accordion.component';
import { NgbdAlertBasicComponent } from './current/alert.component';
import { NgbdCarouselBasicComponent } from './location/carousel.component';
import { CardsComponent } from './notifications/card.component';

export const ComponentsRoutes: Routes = [
	{
		path: '',
		children: [
			{
				path: 'notifications',
				component: CardsComponent,
				data: {
					title: 'Error Notifications',
					urls: [
						{ title: 'Dashboard', url: '/dashboard' },
						{ title: 'ngComponent' },
						{ title: 'Error Notifications' }
					]
				}
			},
			{
				path: 'historical',
				component: NgbdAccordionBasicComponent,
				data: {
					title: 'Historical Data',
					urls: [
						{ title: 'Dashboard', url: '/dashboard' },
						{ title: 'ngComponent' },
						{ title: 'Historical Data' }
					]
				}
			},
			{
				path: 'current',
				component: NgbdAlertBasicComponent,
				data: {
					title: 'Current Data',
					urls: [
						{ title: 'Dashboard', url: '/dashboard' },
						{ title: 'ngComponent' },
						{ title: 'currentData' }
					]
				}
			},
			{
				path: 'location',
				component: NgbdCarouselBasicComponent,
				data: {
					title: 'Location',
					urls: [
						{ title: 'Dashboard', url: '/dashboard' },
						{ title: 'ngComponent' },
						{ title: 'Location' }
					]
				}
			}
		]
	}
];
