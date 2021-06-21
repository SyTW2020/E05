import { Component, OnInit } from '@angular/core';
import { Subject } from './subject';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.css']
})
export class SubjectsComponent implements OnInit {


  subjects : Subject[] = [];

  subject : Subject = {
    nombre : "",
    codigo : "",
    h_practicas : undefined,
    h_teoricas : undefined,
    grupos : ""
  }; 

  constructor() { }

  ngOnInit(): void {
  }


  addSubject() {
    this.subjects.push(this.subject)
  }

}
