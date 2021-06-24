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
  // private URL = 'http://localhost:3000/api';

  getAsignaturas(curso: string): any {
    if (curso !== undefined) {
      return this.httpClient.get<any>(this.URL + '/cursos/' + curso);
    }
  }

  addAsignatura(curso : string, asig : any): any {
    return this.httpClient.post<any>(this.URL + '/cursos/' + curso, asig);
  }

  deleteAsignatura(curso: string, asig : any): any {
    return this.httpClient.request<any>('DELETE',this.URL + '/cursos/' + curso, {body: asig})
  }
}
