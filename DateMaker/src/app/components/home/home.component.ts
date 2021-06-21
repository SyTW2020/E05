import { Component, OnInit } from '@angular/core';
import { Course } from './course';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  courses : Course[] = []
  course : Course = {
    nombre : ""
  }
  selCurso = '';

  constructor() { }

  ngOnInit(): void {
  }

  addCourse() {
    this.courses.push(this.course)
  }
}
