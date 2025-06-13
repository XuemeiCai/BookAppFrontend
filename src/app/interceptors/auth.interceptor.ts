import { Injectable } from '@angular/core';
import {
  HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpClient
} from '@angular/common/http';
import { Observable, throwError, switchMap, catchError, map } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private http: HttpClient) {}

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
        if (error.status === 401 && localStorage.getItem('refreshToken')) {
          return this.refreshToken().pipe(
            switchMap((newToken: string) => {
              localStorage.setItem('token', newToken);
              const retryReq = req.clone({
                headers: req.headers.set('Authorization', `Bearer ${newToken}`)
              });
              return next.handle(retryReq);
            }),
            catchError(err => {
              this.logout(); 
              return throwError(() => err);
            })
          );
        }
        return throwError(() => error);
      })
    );
  }

  private refreshToken(): Observable<any> {
    return this.http.post<{ token: string }>('/api/auth/refresh', {
      refreshToken: localStorage.getItem('refreshToken')
    }).pipe(
      switchMap(response => {
        return new Observable(observer => {
          observer.next(response.token);
          observer.complete();
        });
      })
    );
  }

  private logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    
  }
}
