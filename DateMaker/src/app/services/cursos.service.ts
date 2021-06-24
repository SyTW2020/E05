import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private httpClient: HttpClient) {
  }


  private URL = 'https://e05-sytw.herokuapp.com/api';

  getCursos(): any {
    return this.httpClient.get<any>(this.URL + '/cursos');
  }

  addCurso(curso : string) {
    return this.httpClient.post(this.URL + '/cursos', curso, this.httpOptions)
  }

  deleteCurso(curso : string) {
    return this.httpClient.delete(this.URL + '/cursos/' + curso, this.httpOptions)
  }
}
