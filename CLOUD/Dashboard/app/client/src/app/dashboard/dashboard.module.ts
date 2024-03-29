import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";
import { ChartsModule } from "ng2-charts";
import { DashboardComponent } from "./dashboard.component";
import { SalesGraphComponent } from './dashboard-components/sales-graph/sales-graph.component';
import { VisitGraphComponent } from './dashboard-components/visit-graph/visit-graph.component';
import { WebsiteGraphComponent } from './dashboard-components/website-graph/website-graph.component';
import { CardsComponent } from './dashboard-components/cards/cards.component';
import { ContactsComponent } from './dashboard-components/contacts/contacts.component';
import { ProjectOfMonthComponent } from './dashboard-components/project-of-month/project-of-month.component';
import {LeafletModule} from '@asymmetrik/ngx-leaflet';

const routes: Routes = [
  {
    path: "",
    data: {
      title: "Dashboard",
      urls: [{ title: "Dashboard", url: "/dashboard" }, { title: "Dashboard" }],
    },
    component: DashboardComponent,
  },
];

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    RouterModule.forChild(routes),
    ChartsModule,
    LeafletModule
  ],
  declarations: [DashboardComponent, SalesGraphComponent, VisitGraphComponent, WebsiteGraphComponent, CardsComponent, ContactsComponent, ProjectOfMonthComponent],
})
export class DashboardModule {}
