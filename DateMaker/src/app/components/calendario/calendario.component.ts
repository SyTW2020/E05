import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})
export class CalendarioComponent implements OnInit {

  constructor() { }

  selCurso = '';


  cursos: string[] = ['curso1', 'curso2', 'curso3'];

  lista: string[] = [
    'vacio'
  ];
  lunes: string[] = [];
  martes: string[] = [];
  miercoles: string[] = [];
  jueves: string[] = [];
  viernes: string[] = [];

  ngOnInit(): void {
  }
  get_Asignaturas(): void{
    // llame a un servicio con la opcion del selector
    console.log(this.selCurso);
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
