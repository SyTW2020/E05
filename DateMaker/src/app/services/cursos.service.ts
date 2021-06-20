import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  constructor(private httpClient: HttpClient) { }

  private URL = 'http://localhost:3000/api';

  getCursos (): any {
    return this.httpClient.get<any>(this.URL + '/cursos');
  }
}
