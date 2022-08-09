import { Component } from '@angular/core';
import { DataService } from '../../services/data.service';
import { GlobalVariables } from '../../shared/global-variables';
import {NgbPaginationConfig} from '@ng-bootstrap/ng-bootstrap'; 
import {NgbDate, NgbCalendar, NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'app-ngbd-accordion-basic',
	templateUrl: 'accordion.component.html',
	styleUrls: ['accordion.component.scss'],
	providers: [NgbPaginationConfig]

})
export class NgbdAccordionBasicComponent {

	public isCollapsed = true;

	hoveredDate: NgbDate | null = null;
  	fromDate!: NgbDate | null;
 	toDate!: NgbDate | null;

	historicalData = GlobalVariables.historical
	lista:string[]=["urn:ngsi-ld:DataSource:WeatherObserved:Thessaloniki","urn:ngsi-ld:DataSource:WeatherObserved:Valencia","urn:ngsi-ld:DataSource:GreekSampleData","urn:ngsi-ld:DataSource:PcsData"];
	
	p: number = 1;
	id = ""
	type = "WeatherObserved"
	error: boolean = true;
	errorMes:any
	constructor(
		private dataService: DataService,
		private calendar: NgbCalendar, 
		public formatter: NgbDateParserFormatter
	  ) {
		this.fromDate = calendar.getToday();
		this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
	  }
	

	collapse(){
        this.isCollapsed = !this.isCollapsed;
      }

	buttonHistoricalData(id:string, type:string){
		this.historicalData = []
		GlobalVariables.historical = []
		this.dataService.getHistoricalData(id,type).subscribe(
			res=>{				
				this.error = true;
				console.log(res)
			},
			err=>{
				console.log(err)
				this.errorMes = err["error"]["message"]
				this.error = false;
			}
		)
		this.historicalData = GlobalVariables.historical
	}

	onDateSelection(date: NgbDate) {
		if (!this.fromDate && !this.toDate) {
			this.fromDate = date;
		} else if (this.fromDate && !this.toDate && date && date.after(this.fromDate)) {
			this.toDate = date;
		} else {
			this.toDate = null;
			this.fromDate = date;
		}
	}

	isHovered(date: NgbDate) {
		return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
	}

	isInside(date: NgbDate) {
		return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
	}

	isRange(date: NgbDate) {
		return date.equals(this.fromDate) || (this.toDate && date.equals(this.toDate)) || this.isInside(date) || this.isHovered(date);
	}

	validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
		const parsed = this.formatter.parse(input);
		return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
	}	

}
