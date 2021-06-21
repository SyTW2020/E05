import { Component, OnInit } from '@angular/core';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

import { CursosService } from 'src/app/services/cursos.service';
import {AsignaturasService} from 'src/app/services/asignaturas.service';
@Component({
  selector: 'app-visor',
  templateUrl: './visor.component.html',
  styleUrls: ['./visor.component.css']
})
export class VisorComponent implements OnInit {

  constructor(private cursosService: CursosService, private asignaturasService: AsignaturasService) { }

  selCurso = '';

  cursos: string[] = [];
  lista: string[] = [
    'vacio'
  ];

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

  downloadPDF(): void {
    const doc = new jsPDF({
      orientation: "landscape"
    });

    autoTable(doc, { html: '#calendario' });
    doc.save('calendario.pdf');
  }

  get_Asignaturas(): void{
    console.log(this.selCurso);
    this.asignaturasService.getAsignaturas(this.selCurso).subscribe(
      (res: any) => {
        console.log(res.user.cursos[0].asignaturas);
        this.lista = [];

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
        this.construirCalendario();
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  construirCalendario(): void {
    const calendario = document.getElementById('calendario');

    let calendarioHTML = `<tr>
    <th>Lunes</th>
    <th>Martes</th>
    <th>Miercoles</th>
    <th>Jueves</th>
    <th>Viernes</th>
  </tr>`;

    for(let i = 0; i < 6; i++) {
      calendarioHTML += `<tr>`;
      for(let j = 0; j < 5; j++) {
        const random = Math.floor(Math.random() * this.lista.length - 1) + 1;
        calendarioHTML += `<td>${this.lista[random]}</td>`;
      }
      calendarioHTML += `</tr>`
    }

    calendario!.innerHTML = calendarioHTML;
  }

}
