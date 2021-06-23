import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Asignatura } from '../components/asignaturas/asignatura';

@Injectable({
  providedIn: 'root'
})
export class AsignaturasService {

  constructor(private httpClient: HttpClient) { }
  
  private URL = 'https://e05-sytw.herokuapp.com/api';

  getAsignaturas(curso: string): any {
    if (curso !== undefined) {
      return this.httpClient.get<any>(this.URL + '/cursos/' + curso);
    }
  }

  addAsignatura(nombre : string, codigo : string, h_practicas : number, h_teoricas : number, grupos : string) {
    const header = { nombre , codigo, h_practicas, h_teoricas, grupos }
    return this.httpClient.post(this.URL + '/asignaturas', header);
  }

  deleteAsignatura(asignatura : Asignatura) {
    //return this.httpClient.post(this.URL + '/asignaturas', asignatura);
  }
}
