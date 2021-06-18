import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})

export class SignUpComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router){}
  // material
  email = new FormControl('', [Validators.required, Validators.email]);
  hide = true;

  // functions
  user = {
    email: '',
    password: '',
    passwordconf: ''
  };

  getErrorMessage(): any {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  ngOnInit(): void{

  }

  onSubmit(): void {
    this.authService.signUp(this.user).subscribe(
      (res: any) => {
        console.log(res);
        localStorage.setItem('token', res.token);
        this.router.navigate(['/home']);
      },
      (err: any) => {
        alert(err.error);
        console.log(err);
      }
    );
  }
}
