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

  selCourse = '';
  constructor() { }

  ngOnInit(): void {
  }

  addCourse() {
    this.courses.push(this.course)
  }

  removeCourse() {
    for (var i = 0; i < this.courses.length; i++) {
      if (this.courses[i].nombre == this.selCourse) {
          this.courses.splice(i, 1)
      }
    }
    console.log(this.courses)
  }
}
