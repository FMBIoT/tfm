import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-visit-graph',
  templateUrl: './visit-graph.component.html',
  styleUrls: ['./visit-graph.component.css']
})
export class VisitGraphComponent implements OnInit {

    // Doughnut
    public doughnutChartLabels: string[] = ['Temperature'];
    public doughnutChartOptions = {
      borderWidth: 1,
      maintainAspectRatio: false
    };
    public doughnutChartData: number[] = [30];
    public doughnutChartType = 'doughnut';
    public doughnutChartLegend = false;

  constructor() { }

  ngOnInit(): void {
  }

}
