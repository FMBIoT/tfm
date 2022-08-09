import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {NgxPaginationModule} from 'ngx-pagination';
import { MatTableModule } from '@angular/material/table';

import { ComponentsRoutes } from './component.routing';
import { NgbdAccordionBasicComponent } from './historical/accordion.component';
import { NgbdAlertBasicComponent } from './current/alert.component';
import { NgbdCarouselBasicComponent } from './location/carousel.component';
import { CardsComponent } from './notifications/card.component';
import {LeafletModule} from '@asymmetrik/ngx-leaflet';
import { AceEditorModule } from 'ng2-ace-editor';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ComponentsRoutes),
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgxPaginationModule,
    MatTableModule,
    LeafletModule,
    AceEditorModule
  ],
  declarations: [
    NgbdAccordionBasicComponent,
    NgbdAlertBasicComponent,
    NgbdCarouselBasicComponent,
    CardsComponent    
  ]
})
export class ComponentsModule {}
