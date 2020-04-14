import { Component } from '@angular/core';
import { ROUTES_STRINGS } from '../../../constants/routing';
import { filter, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(public authService: AuthService,
              private router: Router) {

    let urlToRedirect: string;
    this.authService.isLoggedIn$.pipe(
      tap((isLoggedIn: boolean): void => {
        if (!isLoggedIn && location.pathname === `/${ROUTES_STRINGS.REGISTER}`) {
          urlToRedirect = `/${ROUTES_STRINGS.MAIN}`;
        }
        if (!isLoggedIn && location.pathname !== `/${ROUTES_STRINGS.REGISTER}`) {
          this.router.navigate([ROUTES_STRINGS.LOGIN]);
          urlToRedirect = `/${ROUTES_STRINGS.MAIN}`;
        }
      }),
      filter(result => result)
    ).subscribe((): void => {
      if (urlToRedirect) {
        this.router.navigateByUrl(urlToRedirect);
        urlToRedirect = null;
      }
    });

  }

}
