import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ CommonModule, FormsModule],

  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  username = '';
  password = '';
  loginError = false;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  login() {
    this.authService.login(this.username, this.password).subscribe({
      next: (res: any) => {
        if (res.success) {
          this.authService.saveSession(res.token, res.refreshToken, res.username);
          this.router.navigate(['/']);
        }
      },
      error: () => {
        this.loginError = true;
        this.authService.clearSession();
      }
    });
  }

}
