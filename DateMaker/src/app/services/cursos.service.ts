import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  constructor(private httpClient: HttpClient) {
  }

  private URL = 'https://e05-sytw.herokuapp.com/api';

  getCursos(): any {
    return this.httpClient.get<any>(this.URL + '/cursos');
  }

  addCurso(curso : string) {
    return this.httpClient.post(this.URL + '/cursos', curso)
  }

  deleteCurso(curso : string) {
    //return this.httpClient.delete(this.URL + '/cursos', curso)
  }
}
