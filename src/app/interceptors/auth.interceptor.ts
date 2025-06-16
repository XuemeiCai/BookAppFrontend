import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { catchError, switchMap, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = localStorage.getItem('token');

  // Clone request with auth header if token exists
  let authReq = req;
  if (token) {
    authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });
  }

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      const isRefreshRequest = req.url.includes('/refresh');
      
      // Don't attempt refresh if this is already a refresh request
      if (isRefreshRequest) {
        return throwError(() => new Error('Refresh token failed'));
      }

      // Attempt token refresh on 401 errors
      if (error.status === 401 && localStorage.getItem('refreshToken')) {
        return authService.refreshToken().pipe(
          switchMap((newToken: { token: string, refreshToken: string }) => {
            // Store new tokens
            localStorage.setItem('token', newToken.token);
            localStorage.setItem('refreshToken', newToken.refreshToken);
            
            // Retry original request with new token
            const retryReq = req.clone({
              headers: req.headers.set('Authorization', `Bearer ${newToken.token}`)
            });
            return next(retryReq);
          }),
          catchError(err => {
            // If refresh fails, logout and throw error
            authService.logout();
            return throwError(() => err);
          })
        );
      }

      // For all other errors
      return throwError(() => error);
    })
  );
};