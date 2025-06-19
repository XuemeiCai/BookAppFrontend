import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ CommonModule, FormsModule],

  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  @ViewChild('registrationForm') registrationForm!: NgForm;

  username = '';
  password = '';
  loginError = false;

  registerUsername = '';
  usernameTaken = false;
  usernameCheckTimeout: any;
  registerPassword = '';
  confirmPassword = '';
  registerSuccess = false;
  registerError = false;
  isRegisterMode = false;

  isLoading = false;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  login() {
    this.isLoading = true;
    this.authService.login(this.username, this.password).subscribe({
      next: (res: any) => {
        if (res.success) {
          this.authService.saveSession(res.token, res.refreshToken, res.username);
          this.router.navigate(['/']);
          this.isLoading = false;
        }
      },
      error: () => {
        this.loginError = true;
        this.authService.clearSession();
        this.isLoading = false;
      }
    });
  }

  register() {
    this.isLoading = true;
    this.authService.register(this.registerUsername, this.registerPassword).subscribe({
      next: () => {
        this.registerSuccess = true;
        this.registerError = false;
        this.registrationForm.resetForm();
        this.isLoading = false; 
      },
      error: () => {
        this.registerError = true;
        this.registerSuccess = false;
        this.isLoading = false; 
      }
    });
  }

  checkUsernameAvailability() {
    clearTimeout(this.usernameCheckTimeout); 
    this.usernameCheckTimeout = setTimeout(() => {
      if (this.registerUsername.length >= 3) {
        this.authService.isUsernameTaken(this.registerUsername).subscribe({
          next: (exists: boolean) => {
            this.usernameTaken = exists;
          },
          error: () => {
            this.usernameTaken = false;
          }
        });
      } else {
        this.usernameTaken = false;
      }
    }, 500); 
  }

  toggleMode() {
    this.isRegisterMode = !this.isRegisterMode;
    this.loginError = false;
    this.registerError = false;
    this.registerSuccess = false;
    this.username = '';
    this.password = '';
    this.registerUsername = '';
    this.registerPassword = '';
  }

}
