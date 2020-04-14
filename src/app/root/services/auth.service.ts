import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { LocalStorageService } from './local-storage.service';
import { HttpClient } from '@angular/common/http';
import { User } from '../../models/user';
import { AuthPayload, AuthResponse } from '../../models/auth';
import { BASE_URL,
  EMAIL_KEY,
  TOKEN_KEY,
  USER_KEY
} from '../../constants/api';
import { ROUTES_STRINGS } from '../../constants/routing';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
  public isLoggedIn$: BehaviorSubject<boolean>;
  private fictiveName = 'Nick';
  private fictivePassword: any = '888888';
  private fictiveEmail = 'samenyuk_mykola@ukr.net';
  private fictiveToken = 1111;

  constructor(private localStorageService: LocalStorageService,
              private router: Router,
              private http: HttpClient) {
    this.isLoggedIn$ = new BehaviorSubject<boolean>(!!this.token && !!this.email);
  }

  // Generates a request body and sends a request for the login.
  public login(requestBody: AuthPayload): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${BASE_URL}/login?rememberMe=true`, requestBody).pipe(
      tap(authData => {
        this.localStorageService.set(TOKEN_KEY, authData.result.token);
        this.localStorageService.set(EMAIL_KEY, requestBody.email);
        this.isLoggedIn$.next(true);
      }),
      catchError(error => {
        if (requestBody.email === this.fictiveEmail || requestBody.password === this.fictivePassword) {
          this.localStorageService.set(TOKEN_KEY, this.fictiveToken);
          this.localStorageService.set(EMAIL_KEY, requestBody.email);
          this.isLoggedIn$.next(true);
          this.fetchUserData();
          this.router.navigate([ROUTES_STRINGS.LIST]);
        }
        return throwError(error);
      })
    );
  }

  public logout(): Observable<AuthResponse> {
    this.localStorageService.clear();
    sessionStorage.clear();
    this.isLoggedIn$.next(false);
    this.router.navigate([ROUTES_STRINGS.LOGIN]);
    return this.http.post<AuthResponse>(`${BASE_URL}/logout`, null);
  }

  // Sends a request to the server to register a new user.
  public registerUser(requestBody: AuthPayload): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${BASE_URL}/register?rememberMe=true`, requestBody).pipe(
      tap(authData => {
        this.localStorageService.set(TOKEN_KEY, authData.result.token);
        this.localStorageService.set(EMAIL_KEY, requestBody.email);
        this.isLoggedIn$.next(true);
      }),
      catchError(error => {
        if (requestBody.email !== null && requestBody.email !== '' &&
          requestBody.password !== null && requestBody.password !== '') {
          this.localStorageService.set(TOKEN_KEY, this.fictiveToken);
          this.localStorageService.set(EMAIL_KEY, requestBody.email);
          this.fictiveEmail = requestBody.email;
          this.fictivePassword = requestBody.password;
          this.fictiveName = requestBody.userName;
          this.isLoggedIn$.next(true);
          this.fetchUserData();
          this.router.navigate([ROUTES_STRINGS.LIST]);
        }
        return throwError(error);
      })
    );
  }

  public fetchUserData(): Observable<User> {
    if (!this.user) {
      this.localStorageService.set(USER_KEY, this.fictiveName);
    }
    return this.getUser();
  }

  // Sends a request directly to receive the attributes of the current user.
  private getUser(): Observable<User> {
    return this.http.get<User>(`${BASE_URL}/user`).pipe(
      tap(user => {
        this.localStorageService.set(USER_KEY, user);
      }),
      catchError(error => {
        this.localStorageService.set(USER_KEY, this.fictiveName);
        return throwError(error);
      })
    );
  }

  public get token(): string {
    return this.localStorageService.get(TOKEN_KEY);
  }

  public get user(): User {
    return this.localStorageService.get(USER_KEY);
  }

  public get email(): string {
    return this.localStorageService.get(EMAIL_KEY);
  }
}
