import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.authService.token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${this.authService.token}`
        }
      });
    }

    return next.handle(req).pipe(
      catchError((err) => {
        if (err.status === 401 || err.status === 403) {
          this.authService.logout();
        }
        return throwError(err);
      })
    );
  }
}
