import { Component, OnInit } from '@angular/core';
import { DatalistService } from '../datalist.service';
import { RouterModule } from '@angular/router';
import {FormGroup,FormControl} from '@angular/forms';
import{ IStudent } from '../student';
import { DetailsComponent } from '../details/details.component';


@Component({
  selector: 'app-cse',
  templateUrl: './cse.component.html',
  styleUrls: ['./cse.component.css']
})
export class CseComponent implements OnInit {
  public students: IStudent[]=[];
      addForm= new FormGroup(
    {
      name: new FormControl(),
      id: new FormControl(),
      branch: new FormControl(),
      gpa: new FormControl()
    });


  constructor( private datalistService: DatalistService) { }

  ngOnInit() {
  this.datalistService.getCseStudentDetails()
  .subscribe(data=> this.students= data);
  }

  onSubmit(){
    this.datalistService
    .addStudent(this.addForm.value)
    .subscribe(data => this.students.push(data));
    console.log(this.addForm.value);
  }
  // onDelete(){
  //   this.datalistService
  // .deleteStudent(this.students.id)
  // .subscribe();
  // }
  msg(){
    console.log("hey There");
  }



}
