import { Component, OnInit } from '@angular/core';
import { CursosService } from 'src/app/services/cursos.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  cursos : string[] = []

  selcurso = '';
  constructor(private cursosService: CursosService) { }

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

  addCourse() {
    this.cursosService.post(this.selcurso)
  }

  removeCourse() {
    for (var i = 0; i < this.cursos.length; i++) {
      if (this.cursos[i] == this.selcurso) {
          this.cursos.splice(i, 1)
      }
    }
    console.log(this.cursos)
  }
}
