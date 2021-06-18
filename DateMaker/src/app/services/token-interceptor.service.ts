import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import {AuthService} from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{

  intercept(req: any,next: any) {
    const request = req.clone({
      setHeaders: {
        auth: 'Bearer ' + this.authService.get_token() 
      }
    })
    return next.handle(request);
  }

  constructor(private authService: AuthService) { }
}
