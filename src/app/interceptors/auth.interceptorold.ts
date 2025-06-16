import { Injectable } from '@angular/core';
import {
  HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpClient
} from '@angular/common/http';
import { Observable, throwError, switchMap, catchError } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

  constructor(private http: HttpClient, private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');

    let authReq = req;
    if (token) {
      authReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`)
      });
    }

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        const isRefreshRequest = req.url.includes('/refresh');
        if (isRefreshRequest) {
          return throwError(() => new Error('refreshtoken not succeed'));
        }
        if (error.status === 401 && localStorage.getItem('refreshToken')) {
          return this.authService.refreshToken().pipe(
            switchMap((newToken:{ token: string,refreshToken:string } ) => {
              localStorage.setItem('token', newToken.token);
              localStorage.setItem('refreshToken', newToken.refreshToken);
              const retryReq = req.clone({
                headers: req.headers.set('Authorization', `Bearer ${newToken.token}`)
              });
              return next.handle(retryReq);
            }),
            catchError(err => {
              this.authService.logout(); 
              return throwError(() => err);
            })
          );
        }
        return throwError(() => error);
      })
    );
  }
}
