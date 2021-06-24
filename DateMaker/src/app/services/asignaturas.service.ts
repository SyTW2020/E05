import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AsignaturasService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private httpClient: HttpClient) { }
  
  private URL = 'https://e05-sytw.herokuapp.com/api';

  getAsignaturas(curso: string): any {
    if (curso !== undefined) {
      return this.httpClient.get<any>(this.URL + '/cursos/' + curso);
    }
  }

  addAsignatura(curso : string, nombre : string, codigo : string, h_practicas : number, h_teoricas : number, grupos : string) {
    const header = { nombre , codigo, h_practicas, h_teoricas, grupos }
    return this.httpClient.post(this.URL + '/cursos/' + curso, header);
  }

  deleteAsignatura(curso: string, asignatura : any) {
    let params = new HttpParams();
    params = params.append('asignatura' , asignatura)
    return this.httpClient.delete(this.URL + '/cursos/' + curso, { params })
  }
}
