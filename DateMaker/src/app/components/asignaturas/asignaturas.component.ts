import { Component, OnInit } from '@angular/core';
import { Asignatura } from './asignatura'; 
import { AsignaturasService } from 'src/app/services/asignaturas.service';

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
    h_practicas : 0,
    h_teoricas : 0,
    grupos : ""
  }; 

  displayedColumns: string[] = ['nombre', 'codigo', 'h_practicas', 'h_teoricas', 'grupos', 'eliminar'];
  dataSource = this.asignaturas

  constructor(private asignaturasService: AsignaturasService) { }

  ngOnInit(): void { 

    
  }


  addAsignatura() {
    this.asignaturas.push(this.asignatura)
    this.asignaturasService.addAsignatura(this.asignatura.nombre, this.asignatura.codigo, this.asignatura.h_practicas, this.asignatura.h_teoricas, this.asignatura.grupos)

  }

  removeAsignatura() {
    this.asignaturasService.deleteAsignatura(this.asignatura)
  }

}
