import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //url de la API
  private URL = 'http://localhost:3000/api';

  constructor(private http: HttpClient, private router: Router) { }

  signUp (user:any) {
    return this.http.post<any>(this.URL + '/sup', user);
  }
  logIn (user:any) {
    return this.http.post<any>(this.URL + '/sin', user);
  }

  logged(){
    if (localStorage.getItem('token'))
      return true
    else
      return false
  }

  get_token(){
    return localStorage.getItem('token');
  }

  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
