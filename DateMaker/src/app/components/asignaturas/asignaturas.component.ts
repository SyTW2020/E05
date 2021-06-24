import { Component, Inject, OnInit } from '@angular/core';
import { Asignatura } from './asignatura'; 
import { AsignaturasService } from 'src/app/services/asignaturas.service';
import { ActivatedRoute } from '@angular/router';

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
    practicas : 0,
    teoria : 0,
    grupos : ""
  }; 

  selCurso = ''
  displayedColumns: string[] = ['nombre', 'codigo', 'h_practicas', 'h_teoricas', 'grupos', 'eliminar'];
  dataSource = this.asignaturas

  constructor(private asignaturasService: AsignaturasService, private rutaActiva : ActivatedRoute) { }

  ngOnInit(): void { 
    this.selCurso = this.rutaActiva.snapshot.params.curso
    this.asignaturasService.getAsignaturas(this.selCurso).subscribe(
      (res: any) => {
        console.log(res.user.cursos[0].asignaturas);
        res.user.cursos[0].asignaturas.forEach((element: any) => {
          var asig : Asignatura = {
            nombre : element.nombre,
            codigo : element.codigo,
            practicas : element.practicas,
            teoria : element.teoria,
            grupos : element.grupos,
          }
          this.asignaturas.push(asig)
        });
      },
      (err: any) => {
        console.log(err);
      }
    );
    
  }

  addAsignatura() {
    this.asignaturasService.addAsignatura(this.selCurso, this.asignatura).subscribe(
      (res: any) => {
        console.log(res);
        this.asignaturas = [];
        res.user.asignaturas.forEach((element: any) => {
          this.asignaturas.push(element.asignatura);
        });
      },
      (err: any) => {
        console.log(err);
      },
    );
  }

  removeAsignatura(asignatura : Asignatura) {
    console.log(this.selCurso)
    this.asignaturasService.deleteAsignatura(this.selCurso, asignatura).subscribe(
      (res: any) => {
        console.log(res);
        this.asignaturas = [];
        res.user.asignaturas.forEach((element: any) => {
          this.asignaturas.push(element.asignatura);
        });
      },
      (err: any) => {
        console.log(err);
      },
    );
  }

}
