import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AsignaturasService {

  constructor(private httpClient: HttpClient) { }

  private URL = 'https://e05-sytw.herokuapp.com//api';

  getAsignaturas(curso: string): any {
    if (curso !== undefined) {
      return this.httpClient.get<any>(this.URL + '/cursos/' + curso);
    }
  }
}
