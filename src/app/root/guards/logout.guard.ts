import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ROUTES_STRINGS } from '../../constants/routing';

@Injectable()
export class LogoutGuard implements CanActivate {

  constructor(private authService: AuthService,
              private router: Router) {}

  public canActivate(): boolean {
    const isLoggedOut: boolean = !this.authService.isLoggedIn$.getValue();
    if (!isLoggedOut) {
      this.router.navigateByUrl(`/${ROUTES_STRINGS.LIST}`);
    }
    return isLoggedOut;
  }
}
