import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // url de la API
  private URL = 'https://e05-sytw.herokuapp.com//api';

  constructor(private http: HttpClient, private router: Router) { }

  signUp(user: any): any {
    return this.http.post<any>(this.URL + '/sup', user);
  }
  logIn(user: any): any {
    return this.http.post<any>(this.URL + '/sin', user);
  }

  logged(): boolean {
    if (localStorage.getItem('token')) {
      return true;
    }
    else {
      return false;
    }
  }

  get_token(): any{
    return localStorage.getItem('token');
  }

  logout(): void{
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
