import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  // httpOptions = {
  //   headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  // };

  constructor(private httpClient: HttpClient) {
  }

  private URL = 'https://e05-sytw.herokuapp.com/api';
  // private URL = 'http://localhost:3000/api';

  getCursos(): any {
    return this.httpClient.get<any>(this.URL + '/cursos');
  }

  addCurso(curso : any): any{
    return this.httpClient.post<any>(this.URL + '/cursos', curso)
  }
  
  deleteCurso(curso :any): any {
    return this.httpClient.request<any>('DELETE',this.URL + '/cursos', {body: curso})
  }
}
