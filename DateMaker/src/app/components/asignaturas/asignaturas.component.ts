import { Component, OnInit } from '@angular/core';
import { Asignatura } from './asignatura';

@Component({
  selector: 'app-asignaturas',
  templateUrl: './asignaturas.component.html',
  styleUrls: ['./asignaturas.component.css']
})
export class AsignaturasComponent implements OnInit {


  asignaturas : Asignatura[] = [];

  asignatura : Asignatura = {
    nombre : "",
    codigo : "",
    h_practicas : undefined,
    h_teoricas : undefined,
    grupos : ""
  }; 

  constructor() { }

  ngOnInit(): void {
  }


  addAsignatura() {
    this.asignaturas.push(this.asignatura)
  }

}
