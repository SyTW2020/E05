import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})

export class LogInComponent implements OnInit {
  // material
  email = new FormControl('', [Validators.required, Validators.email]);
  hide = true;

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }
    
    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
  
  //funciones
  user = { 
    email: '',
    password: ''
  }

  constructor(private authService: AuthService, private router: Router){}

  ngOnInit (){
    
  }

  onSubmit(): void {
    this.authService.logIn(this.user).subscribe(
      res => {
        console.log(res);
        localStorage.setItem('token', res.token);
        this.router.navigate(['/home'])
      },
      err => {
        alert(err.error)
        console.log(err)
      }
    );
  }
}
