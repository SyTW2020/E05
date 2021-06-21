import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

import { CursosService } from 'src/app/services/cursos.service';
import {AsignaturasService} from 'src/app/services/asignaturas.service';
import { range } from 'rxjs';
@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})
export class CalendarioComponent implements OnInit {

  constructor(private cursosService: CursosService, private asignaturasService: AsignaturasService) { }

  selCurso = '';


  cursos: string[] = [];

  lista: string[] = [
    'vacio'
  ];
  lunes: string[] = [];
  martes: string[] = [];
  miercoles: string[] = [];
  jueves: string[] = [];
  viernes: string[] = [];

  ngOnInit(): void {
    this.cursosService.getCursos().subscribe(
      (res: any) => {
        console.log(res);
        res.user.cursos.forEach((element: any) => {
          this.cursos.push(element.curso);
        });
      },
      (err: any) => {
        console.log(err);
      },
    );
  }
  get_Asignaturas(): void{
    console.log(this.selCurso);
    this.asignaturasService.getAsignaturas(this.selCurso).subscribe(
      (res: any) => {
        console.log(res.user.cursos[0].asignaturas);
        this.lista = [];
        this.lunes = [];
        this.martes = [];
        this.miercoles = [];
        this.jueves = [];
        this.viernes = [];
        res.user.cursos[0].asignaturas.forEach((element: any) => {
          const practicas: number = element.practicas;
          const teoria: number = element.teoria;
          const grupos: number = element.grupos;
          console.log(practicas, teoria, grupos);

          const clases: string[] = [];
          const organizacion: string[] = [];
          for (let i = 1; i <= grupos; i++) {
            organizacion.push('grupo' + i);
          }
          for (let j = 1; j <= teoria; j++) {
            clases.push('TE' + j);
          }
          for (let k = 1; k <= practicas; k++){
            clases.push('PE' + k);
          }
          organizacion.forEach(org => {
            clases.forEach(clase => {
              this.lista.push(element.nombre + ' ' + org + ' ' + clase);
            });
          });
        });
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  drop(event: CdkDragDrop<string []>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }
}
