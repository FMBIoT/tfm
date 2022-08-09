import { Component } from '@angular/core';
import { DataService } from '../../services/data.service';
import { GlobalVariables } from '../../shared/global-variables';
import {NgbPaginationConfig} from '@ng-bootstrap/ng-bootstrap'; 
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {NgbDate, NgbCalendar, NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-ngbd-alert',
  templateUrl: 'alert.component.html',
  styleUrls: ['alert.component.scss'],
  providers: [NgbPaginationConfig]
})
export class NgbdAlertBasicComponent{
	public isCollapsed = true;
	currentData = GlobalVariables.current
	respuesta = JSON.stringify(GlobalVariables.current,null,2)
	hoveredDate: NgbDate | null = null;
	fromDate!: NgbDate | null;
   	toDate!: NgbDate | null;
	constructor(
		private dataService: DataService,
		private modalService: NgbModal,
		private calendar: NgbCalendar, 
		public formatter: NgbDateParserFormatter
	  ) {
		this.fromDate = calendar.getToday();
		this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
	  }
	
	lista:string[]=["urn:ngsi-ld:DataSource:PcsData"];
	p: number = 1;
	collapse(){
        this.isCollapsed = !this.isCollapsed;
      }
	id = ""
	type = "PcsData"
	closeResult = '';
	show: boolean = true;
	error: boolean = true;
	

	buttonCurrentData(id:string, type:string){
		this.currentData = []
		GlobalVariables.current = []
		this.dataService.getCurrentData(id,type).subscribe(
	      res => {        
	        this.currentData = res;
			GlobalVariables.current = this.currentData
			this.respuesta = JSON.stringify(GlobalVariables.current,null,2)
			this.show = false;
			this.error = true;
	        },
			err => {
				this.currentData = err["error"]["message"];
				GlobalVariables.current = this.currentData
				this.respuesta = JSON.stringify(GlobalVariables.current,null,2)
				this.error = false;
				this.show = false;
			}
    	)
		
	}
	open(content:string) {
		this.modalService.open(content, { centered: true }).result.then((result) => {
		  this.closeResult = `Closed with: ${result}`;
		}, (reason) => {
		  this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
		});
	  }
	
	  private getDismissReason(reason: any): string {
		if (reason === ModalDismissReasons.ESC) {
		  return 'by pressing ESC';
		} else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
		  return 'by clicking on a backdrop';
		} else {
		  return `with: ${reason}`;
		}
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
