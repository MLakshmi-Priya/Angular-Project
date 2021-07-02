import { Component, OnInit, Input } from '@angular/core';
import{ IStudent } from '../student';
import { DatalistService } from '../datalist.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  @Input() student !: IStudent;

  constructor() { }

  ngOnInit(): void {
  }

}
