import { Component, OnInit } from '@angular/core';
import { CursosService } from 'src/app/services/cursos.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  cursos : string[] = []

  curso = {
    nombre: ''
  };

  constructor(private cursosService: CursosService) { }

  ngOnInit(): void { 
    this.cursosService.getCursos().subscribe(
      (res: any) => {
        console.log(res);
        this.cursos = [];
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
    console.log(this.curso)
    this.cursosService.addCurso(this.curso).subscribe(
      (res: any) => {
        console.log(res);
        this.cursos = [];
        res.user.cursos.forEach((element: any) => {
          this.cursos.push(element.curso);
        });
      },
      (err: any) => {
        console.log(err);
      },
    );
  }

  removeCourse() {
    console.log(this.curso)
    this.cursosService.deleteCurso(this.curso).subscribe(
      (res: any) => {
        console.log(res);
        this.cursos = [];
        res.user.cursos.forEach((element: any) => {
          this.cursos.push(element.curso);
        });
      },
      (err: any) => {
        console.log(err);
      },
    );
  }
}
