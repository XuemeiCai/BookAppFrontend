import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ CommonModule, FormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  username = '';
  password = '';
  loginError = false;

  constructor(
    private router: Router,
    private http: HttpClient
  ) {}

  login() {
    this.http.post('https://localhost:5001/api/auth/login', {
      username: this.username,
      password: this.password
    }).subscribe({
      next: (res: any) => {
        if(res.success) {
          localStorage.setItem('token',res.token);
          localStorage.setItem('refreshToken', res.refreshToken);
          localStorage.setItem('username',res.username);
          this.router.navigate(['/']);
        }
        
      },
      error: () => {
        this.loginError = true;
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('username');
      }
    })
  } 

}
