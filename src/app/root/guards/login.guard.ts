import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ROUTES_STRINGS } from '../../constants/routing';

@Injectable()
export class LoginGuard implements CanActivate, CanLoad {

  constructor(private authService: AuthService,
              private router: Router) {
  }


  public canActivate(): boolean {
    const isLoggedIn: boolean = this.authService.isLoggedIn$.getValue();
    if (!isLoggedIn) {
      this.router.navigate([ROUTES_STRINGS.LOGIN]);
    }
    return isLoggedIn;
  }


  public canLoad(): boolean {
    return this.canActivate();
  }
}
