import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient,private router: Router) {}
  
  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/auth/login`, {
      username,
      password
    });
  }

  saveSession(token: string, refreshToken: string, username: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('refreshToken', refreshToken);
    localStorage.setItem('username', username);
  }

  clearSession() {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('username');
  }

  refreshToken(): Observable<any> {
      return this.http.post<{ token: string,refreshToken:string }>(
        '/api/auth/refresh',
        { refreshToken: localStorage.getItem('refreshToken') }
      ).pipe(
        map(response => {
          return {
            token:response.token,
            refreshToken: response.refreshToken
          }

        })
      );
    }

  logout() {
    this.clearSession();
    this.router.navigate(['/login']);
  }


}
